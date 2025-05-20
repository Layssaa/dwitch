variable "vpc_id" {
  description = "ID da VPC onde os serviços serão implantados"
  type        = string
}

variable "subnet_ids" {
  description = "Lista de subnets para deploy dos serviços"
  type        = list(string)
}

variable "security_group_ids" {
  description = "Lista de Security Groups para aplicar nas tasks"
  type        = list(string)
}

variable "cluster_name" {
  description = "Nome do ECS Cluster"
  type        = string
}

variable "ecs_cluster_arn" {
  description = "ARN do ECS Cluster"
  type        = string
  default     = ""
}

variable "alb_arn" {
  description = "ARN do Application Load Balancer"
  type        = string
}

variable "alb_target_group_arns" {
  description = "Lista de ARNs dos target groups do ALB"
  type        = list(string)
}

variable "aws_region" {
  description = "Região AWS"
  type        = string
  default     = "us-east-1"
}
