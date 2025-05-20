variable "cluster_id" {}
variable "subnet_ids" {
  type = list(string)
}
variable "security_group_ids" {
  type = list(string)
}
variable "iam_task_execution_role_arn" {}
variable "iam_task_role_arn" {}

resource "aws_ecs_task_definition" "jaeger" {
  family                   = "jaeger"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = var.iam_task_execution_role_arn
  task_role_arn            = var.iam_task_role_arn

  container_definitions = jsonencode([
    {
      name      = "jaeger"
      image     = "jaegertracing/all-in-one:1.41"
      essential = true
      portMappings = [
        {
          containerPort = 16686
          hostPort      = 16686
          protocol      = "tcp"
        },
        {
          containerPort = 6831
          hostPort      = 6831
          protocol      = "udp"
        }
      ]
      environment = [
        {
          name  = "SPAN_STORAGE_TYPE"
          value = "memory"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/jaeger"
          "awslogs-region"        = "us-east-1" # adapte para sua região
          "awslogs-stream-prefix" = "jaeger"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "jaeger" {
  name            = "jaeger"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.jaeger.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.subnet_ids
    security_groups = var.security_group_ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.jaeger_target_group_arn
    container_name   = "jaeger"
    container_port   = 16686
  }

  depends_on = []
}
