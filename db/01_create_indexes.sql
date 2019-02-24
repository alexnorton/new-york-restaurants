CREATE INDEX `camis` ON `inspection` (`camis`);

CREATE INDEX `camis_id_date` ON `inspection` (`camis`, `inspection_id`, `inspection_date`);

CREATE INDEX `camis_inspection_date` ON `violation` (`camis`, `inspection_date`);
