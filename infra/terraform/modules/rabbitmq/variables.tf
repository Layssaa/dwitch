variable "cluster_id" {
  description = "ECS Cluster ID"
  type        = string
}

variable "subnet_ids" {
  description = "Subnets IDs to deploy RabbitMQ"
  type        = list(string)
}

variable "security_group_ids" {
  description = "Security groups IDs to assign to the service"
  type        = list(string)
}

variable "desired_count" {
  description = "Desired number of RabbitMQ tasks"
  type        = number
  default     = 1
}

variable "container_port" {
  description = "Port where RabbitMQ container listens"
  type        = number
  default     = 5672
}

variable "rabbitmq_image" {
  description = "Docker image for RabbitMQ"
  type        = string
  default     = "rabbitmq:3-management"
}
