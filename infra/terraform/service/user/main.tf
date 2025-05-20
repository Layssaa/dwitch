variable "cluster_id" {}
variable "subnet_ids" {
  type = list(string)
}
variable "security_group_ids" {
  type = list(string)
}
variable "iam_task_execution_role_arn" {}
variable "iam_task_role_arn" {}

resource "aws_ecs_task_definition" "docs" {
  family                   = "docs"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = var.iam_task_execution_role_arn
  task_role_arn            = var.iam_task_role_arn

  container_definitions = jsonencode([
    {
      name      = "docs"
      image     = "nginx:stable-alpine"
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
      mountPoints = [
        {
          sourceVolume  = "swagger-ui"
          containerPath = "/usr/share/nginx/html"
          readOnly      = true
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/docs"
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "docs"
        }
      }
    }
  ])

  volume {
    name = "swagger-ui"

    efs_volume_configuration {
      file_system_id          = var.efs_id
      transit_encryption      = "ENABLED"
      root_directory          = "/swagger-ui"
      authorization_config {
        access_point_id = var.efs_access_point_id
        iam             = "ENABLED"
      }
    }
  }
}

resource "aws_ecs_service" "docs" {
  name            = "docs"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.docs.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.subnet_ids
    security_groups = var.security_group_ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.docs_target_group_arn
    container_name   = "docs"
    container_port   = 80
  }
}
