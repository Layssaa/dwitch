module "channels_api" {
  source = "../modules/ecs-service" # caminho do módulo que criamos

  name               = "user-api"
  container_port     = 5003
  ecr_image_url      = "xxx.dkr.ecr.us-east-1.amazonaws.com/channels-api:latest"
  ecs_cluster_arn    = module.shared.ecs_cluster_arn
  task_exec_role_arn = module.shared.ecs_task_execution_role_arn
  vpc_id             = module.shared.vpc_id
  subnet_ids         = module.shared.private_subnet_ids
  security_group_id  = module.shared.app_sg_id
  alb_target_group_arn = module.shared.channels_tg_arn
}
