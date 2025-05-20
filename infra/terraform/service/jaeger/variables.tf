variable "cluster_id" {
  type = string
}
variable "subnet_ids" {
  type = list(string)
}
variable "security_group_ids" {
  type = list(string)
}
variable "iam_task_execution_role_arn" {
  type = string
}
variable "iam_task_role_arn" {
  type = string
}
variable "jaeger_target_group_arn" {
  type = string
}
