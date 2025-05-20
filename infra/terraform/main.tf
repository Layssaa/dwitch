terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}


provider "aws" {
  region = var.aws_region
}

# ------------------------------------------------------------------------
# Shared Vars - Importação dos recursos compartilhados criados anteriormente
# ------------------------------------------------------------------------
module "shared" {
  source = "./shared"

  vpc_id              = var.vpc_id
  subnet_ids          = var.subnet_ids
  security_group_ids  = var.security_group_ids
  cluster_name        = var.cluster_name
  ecs_cluster_arn     = var.ecs_cluster_arn
  alb_arn             = var.alb_arn
  alb_target_group_arns = var.alb_target_group_arns
}

# ------------------------------------------------------------------------
# AUTH API
# ------------------------------------------------------------------------
module "auth_api" {
  source           = "./modules/ecs-service"
  name             = "auth-api"
  cluster_arn      = module.shared.ecs_cluster_arn
  vpc_id           = module.shared.vpc_id
  subnet_ids       = module.shared.private_subnet_ids
  security_groups  = [module.shared.auth_sg_id]
  container_port   = 5000
  ecr_image_url    = var.auth_api_image_url
  desired_count    = 1
  alb_target_group_arn = module.shared.auth_target_group_arn
  environment = {
    DATABASE_URL = var.auth_database_url
    JWT_SECRET   = var.jwt_secret
  }
}

# ------------------------------------------------------------------------
# CHANNELS API
# ------------------------------------------------------------------------
module "channels_api" {
  source           = "./modules/ecs-service"
  name             = "channels-api"
  cluster_arn      = module.shared.ecs_cluster_arn
  vpc_id           = module.shared.vpc_id
  subnet_ids       = module.shared.private_subnet_ids
  security_groups  = [module.shared.default_sg_id]
  container_port   = 5002
  ecr_image_url    = var.channels_api_image_url
  desired_count    = 1
  alb_target_group_arn = module.shared.channels_target_group_arn
  environment = {
    DATABASE_URL = var.channels_database_url
  }
}

# ------------------------------------------------------------------------
# BROADCASTS API
# ------------------------------------------------------------------------
module "broadcasts_api" {
  source           = "./modules/ecs-service"
  name             = "broadcasts-api"
  cluster_arn      = module.shared.ecs_cluster_arn
  vpc_id           = module.shared.vpc_id
  subnet_ids       = module.shared.private_subnet_ids
  security_groups  = [module.shared.default_sg_id]
  container_port   = 5001
  ecr_image_url    = var.broadcasts_api_image_url
  desired_count    = 1
  alb_target_group_arn = module.shared.broadcasts_target_group_arn
  environment = {
    DATABASE_URL         = var.broadcasts_database_url
    RABBITMQ_SERVER_URL  = var.rabbitmq_url
  }
}

# ------------------------------------------------------------------------
# USER API
# ------------------------------------------------------------------------
module "user_api" {
  source           = "./modules/ecs-service"
  name             = "user-api"
  cluster_arn      = module.shared.ecs_cluster_arn
  vpc_id           = module.shared.vpc_id
  subnet_ids       = module.shared.private_subnet_ids
  security_groups  = [module.shared.default_sg_id]
  container_port   = 5003
  ecr_image_url    = var.user_api_image_url
  desired_count    = 1
  alb_target_group_arn = module.shared.user_target_group_arn
  environment = {
    DATABASE_URL = var.user_database_url
  }
}

# ------------------------------------------------------------------------
# Dwitch Frontend
# ------------------------------------------------------------------------
module "dwitch_frontend" {
  source           = "./modules/ecs-service"
  name             = "dwitch-front"
  cluster_arn      = module.shared.ecs_cluster_arn
  vpc_id           = module.shared.vpc_id
  subnet_ids       = module.shared.public_subnet_ids
  security_groups  = [module.shared.front_sg_id]
  container_port   = 80
  ecr_image_url    = var.front_image_url
  desired_count    = 1
  alb_target_group_arn = module.shared.front_target_group_arn
}

# ------------------------------------------------------------------------
# RabbitMQ 
# ------------------------------------------------------------------------
module "rabbitmq" {
  source            = "./modules/rabbitmq"
  cluster_id        = aws_ecs_cluster.your_cluster.id
  subnet_ids        = var.subnet_ids
  security_group_ids = [aws_security_group.rabbitmq_sg.id]
  desired_count     = 1
}
