resource "aws_db_instance" "postgres_prod" {
  allocated_storage    = 20
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  name                 = "dwitchprod"
  username             = "postgres"
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = true
}

resource "aws_db_instance" "postgres_test" {
  allocated_storage    = 20
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  name                 = "dwitchtest"
  username             = "postgres"
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = true
}
