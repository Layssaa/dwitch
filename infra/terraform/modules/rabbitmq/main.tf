resource "aws_ecs_task_definition" "rabbitmq" {
  family                   = "rabbitmq"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "rabbitmq"
      image     = var.rabbitmq_image
      essential = true
      portMappings = [
        {
          containerPort = var.container_port
          protocol      = "tcp"
        },
        {
          containerPort = 15672
          protocol      = "tcp"
        }
      ]
      environment = []
    }
  ])
}

resource "aws_ecs_service" "rabbitmq" {
  name            = "rabbitmq"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.rabbitmq.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.subnet_ids
    security_groups = var.security_group_ids
    assign_public_ip = true
  }
}
