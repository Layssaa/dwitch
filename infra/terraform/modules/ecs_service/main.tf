resource "aws_ecs_task_definition" "this" {
  family                   = var.name
  network_mode            = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                     = var.cpu
  memory                  = var.memory
  execution_role_arn      = var.execution_role_arn
  task_role_arn           = var.task_role_arn

  container_definitions = jsonencode([
    {
      name      = var.name
      image     = var.image
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ],
      environment = [
          for key, value in var.environment : {
            name  = key
            value = value
          }
        ]      
    }
  ])
}

resource "aws_ecs_service" "this" {
  name            = var.name
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  launch_type     = "FARGATE"
  desired_count   = var.desired_count

  network_configuration {
    subnets         = var.subnets
    assign_public_ip = false
    security_groups = var.security_groups
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = var.name
    container_port   = var.container_port
  }

  depends_on = [aws_ecs_task_definition.this]
}
