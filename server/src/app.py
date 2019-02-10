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
    id = db.Column("inspection_id", db.Integer, primary_key=True)
    camis = db.Column(db.Integer, db.ForeignKey("restaurant.camis"))
    inspection_date = db.Column(db.Date)
    action = db.Column(db.String)
    score = db.Column(db.Integer)
    grade = db.Column(db.String)
    grade_date = db.Column(db.Date)
    inspection_type = db.Column(db.String)
    violations = db.relationship("Violation")


class Violation(db.Model):
    __tablename__ = "violation"
    id = db.Column("violation_id", db.Integer, primary_key=True)
    camis = db.Column(db.Integer)
    inspection_date = db.Column(db.Date)
    violation_code = db.Column(db.String)
    violation_description = db.Column(db.String)
    critical_flag = db.Column(db.String)
    __table_args__ = (
        db.ForeignKeyConstraint(
            [camis, inspection_date], [Inspection.camis, Inspection.inspection_date]
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
    zip_code = db.Column("zipcode", db.String)
    phone = db.Column(db.String)
    cuisine = db.Column(db.String)
    inspections = db.relationship("Inspection")
    last_inspection_date = db.column_property(
        db.select([Inspection.inspection_date])
        .where(Inspection.camis == camis)
        .order_by(Inspection.inspection_date.desc())
        .limit(1)
        .correlate_except(Inspection)
    )
    last_inspection_score = db.column_property(
        db.select([Inspection.score])
        .where(Inspection.camis == camis)
        .order_by(Inspection.inspection_date.desc())
        .limit(1)
        .correlate_except(Inspection)
    )
    last_inspection_grade = db.column_property(
        db.select([Inspection.grade])
        .where(Inspection.camis == camis)
        .order_by(Inspection.inspection_date.desc())
        .limit(1)
        .correlate_except(Inspection)
    )


class ViolationSchema(ma.Schema):
    class Meta:
        model = Violation
        fields = ("violation_code", "violation_description", "critical_flag")


class InspectionSchema(ma.Schema):
    violations = ma.Nested(ViolationSchema, many=True)

    class Meta:
        model = Inspection
        fields = (
            "inspection_date",
            "action",
            "score",
            "grade",
            "inspection_type",
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
            "zip_code",
            "phone",
            "cuisine",
            "last_inspection_date",
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
            "zip_code",
            "phone",
            "cuisine",
            "last_inspection_date",
            "last_inspection_score",
            "last_inspection_grade",
        )


restaurants_schema = RestaurantsSchema(strict=True, many=True)


@app.route("/api/restaurants", methods=["GET"])
def get_restaurants():
    page = request.args.get("page", 1, type=int)
    cuisine = request.args.get("cuisine")

    query = Restaurant.query

    if cuisine is not None:
        query = query.filter_by(cuisine=cuisine)

    restaurants = query.paginate(page).items

    result = restaurants_schema.dump(restaurants)
    return jsonify(result.data)


@app.route("/api/restaurants/<camis>", methods=["GET"])
def get_restaurant(camis):
    restaurant = Restaurant.query.filter_by(camis=camis).first()
    return restaurant_schema.jsonify(restaurant)


app.run()
