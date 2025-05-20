output "auth_service_name" {
  description = "ECS service name for the Auth API"
  value       = aws_ecs_service.auth.name
}

output "auth_task_definition_arn" {
  description = "ARN of the Auth API task definition"
  value       = aws_ecs_task_definition.auth.arn
}

output "channels_service_name" {
  description = "ECS service name for the Channels API"
  value       = aws_ecs_service.channels.name
}

output "channels_task_definition_arn" {
  description = "ARN of the Channels API task definition"
  value       = aws_ecs_task_definition.channels.arn
}

output "broadcasts_service_name" {
  description = "ECS service name for the Broadcasts API"
  value       = aws_ecs_service.broadcasts.name
}

output "broadcasts_task_definition_arn" {
  description = "ARN of the Broadcasts API task definition"
  value       = aws_ecs_task_definition.broadcasts.arn
}

output "user_service_name" {
  description = "ECS service name for the User API"
  value       = aws_ecs_service.user.name
}

output "user_task_definition_arn" {
  description = "ARN of the User API task definition"
  value       = aws_ecs_task_definition.user.arn
}

output "frontend_service_name" {
  description = "ECS service name for the Frontend"
  value       = aws_ecs_service.dwitch_frontend.name
}

output "frontend_task_definition_arn" {
  description = "ARN of the Frontend task definition"
  value       = aws_ecs_task_definition.dwitch_frontend.arn
}
