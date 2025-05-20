variable "name" {}
variable "image" {}
variable "cpu" { default = "256" }
variable "memory" { default = "512" }
variable "container_port" { default = 5000 }
variable "desired_count" { default = 1 }
variable "cluster_id" {}
variable "subnets" { type = list(string) }
variable "security_groups" { type = list(string) }
variable "execution_role_arn" {}
variable "task_role_arn" {}
variable "target_group_arn" {}
variable "environment_variables" {
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}
variable "environment" {
  type        = map(string)
  description = "Environment variables for the container"
  default     = {}
}