variable "cluster_id" {}
variable "subnets" { type = list(string) }
variable "security_groups" { type = list(string) }
variable "execution_role_arn" {}
variable "task_role_arn" {}
variable "target_group_arn" {}
