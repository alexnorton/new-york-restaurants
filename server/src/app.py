import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

load_dotenv()

app = Flask(__name__)

app.config["DEBUG"] = True

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://{}:{}@{}/{}".format(
    os.environ["DATABASE_USER"],
    os.environ["DATABASE_PASSWORD"],
    os.environ["DATABASE_HOST"],
    os.environ["DATABASE_NAME"],
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Inspection(db.Model):
    __tablename__ = "inspection"
    inspectionId = db.Column("inspection_id", db.Integer, primary_key=True)
    camis = db.Column(db.Integer, db.ForeignKey("restaurant.camis"))
    date = db.Column("inspection_date", db.Date)
    action = db.Column(db.String)
    score = db.Column(db.Integer)
    grade = db.Column(db.String)
    type = db.Column("inspection_type", db.String)
    violations = db.relationship("Violation")


class Violation(db.Model):
    __tablename__ = "violation"
    violationId = db.Column("violation_id", db.Integer, primary_key=True)
    camis = db.Column(db.Integer)
    inspection_date = db.Column(db.Date)
    code = db.Column("violation_code", db.String)
    description = db.Column("violation_description", db.String)
    criticalFlag = db.Column("critical_flag", db.String)
    __table_args__ = (
        db.ForeignKeyConstraint(
            [camis, inspection_date], [Inspection.camis, Inspection.date]
        ),
        {},
    )


class Restaurant(db.Model):
    __tablename__ = "restaurant"
    id = db.Column("restaurant_id", db.Integer, primary_key=True)
    camis = db.Column(db.Integer, primary_key=True)
    name = db.Column("dba", db.String)
    building = db.Column(db.String)
    street = db.Column(db.String)
    borough = db.Column("boro", db.String)
    zipCode = db.Column("zipcode", db.String)
    phone = db.Column(db.String)
    cuisine = db.Column(db.String)
    inspections = db.relationship("Inspection")
    lastInspectionDate = db.column_property(
        db.select([Inspection.date])
        .where(Inspection.camis == camis)
        .order_by(Inspection.date.desc())
        .limit(1)
        .correlate_except(Inspection)
    )
    lastInspectionScore = db.column_property(
        db.select([Inspection.score])
        .where(Inspection.camis == camis)
        .order_by(Inspection.date.desc())
        .limit(1)
        .correlate_except(Inspection)
    )
    lastInspectionGrade = db.column_property(
        db.select([Inspection.grade])
        .where(Inspection.camis == camis)
        .order_by(Inspection.date.desc())
        .limit(1)
        .correlate_except(Inspection)
    )


class ViolationSchema(ma.Schema):
    class Meta:
        model = Violation
        fields = ("violationId", "code", "description", "criticalFlag")


class InspectionSchema(ma.Schema):
    violations = ma.Nested(ViolationSchema, many=True)

    class Meta:
        model = Inspection
        fields = (
            "inspectionId",
            "date",
            "action",
            "score",
            "grade",
            "type",
            "violations",
        )


class RestaurantSchema(ma.Schema):
    inspections = ma.Nested(InspectionSchema, many=True)

    class Meta:
        model = Restaurant
        fields = (
            "camis",
            "name",
            "building",
            "street",
            "borough",
            "zipCode",
            "phone",
            "cuisine",
            "lastInspectionDate",
            "inspections",
        )


restaurant_schema = RestaurantSchema(strict=True)


class RestaurantsSchema(ma.Schema):
    class Meta:
        model = Restaurant
        fields = (
            "camis",
            "name",
            "building",
            "street",
            "borough",
            "zipCode",
            "phone",
            "cuisine",
            "lastInspectionDate",
            "lastInspectionScore",
            "lastInspectionGrade",
        )


restaurants_schema = RestaurantsSchema(strict=True, many=True)


@app.route("/api/restaurants", methods=["GET"])
def get_restaurants():
    page = request.args.get("page", 1, type=int)
    page_size = request.args.get("page_size", 10, type=int)

    inspectionAlias1 = db.aliased(Inspection)
    inspectionAlias2 = db.aliased(Inspection)

    # Adapted from https://stackoverflow.com/a/2111420/215484
    query = (
        db.session.query(Restaurant)
        .join(inspectionAlias1)
        .outerjoin(
            inspectionAlias2,
            (Restaurant.camis == inspectionAlias2.camis)
            & (inspectionAlias1.date < inspectionAlias2.date),
        )
        .filter(inspectionAlias2.inspectionId == None)  # noqa: E711
    )

    cuisine = request.args.get("cuisine")
    if cuisine is not None:
        query = query.filter(Restaurant.cuisine == cuisine)

    grade = request.args.get("grade")
    if grade is not None:
        query = query.filter(inspectionAlias1.grade == grade)

    result = query.paginate(page, page_size)

    restaurants = restaurants_schema.dump(result.items)

    return jsonify(
        {
            "page": result.page,
            "pages": result.pages,
            "total": result.total,
            "results": restaurants.data,
        }
    )


@app.route("/api/restaurants/<camis>", methods=["GET"])
def get_restaurant(camis):
    restaurant = Restaurant.query.filter_by(camis=camis).first()
    return restaurant_schema.jsonify(restaurant)


@app.route("/api/cuisines", methods=["GET"])
def get_cuisines():
    rows = (
        db.session.query(Restaurant.cuisine)
        .distinct(Restaurant.cuisine)
        .group_by(Restaurant.cuisine)
        .all()
    )
    return jsonify([row[0] for row in rows])


app.run()
