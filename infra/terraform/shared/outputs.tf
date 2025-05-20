output "vpc_id" {
  value = var.vpc_id
}

output "subnet_ids" {
  value = var.subnet_ids
}

output "security_group_ids" {
  value = var.security_group_ids
}

output "cluster_name" {
  value = var.cluster_name
}

output "ecs_cluster_arn" {
  value = var.ecs_cluster_arn
}

output "alb_arn" {
  value = var.alb_arn
}

output "alb_target_group_arns" {
  value = var.alb_target_group_arns
}
