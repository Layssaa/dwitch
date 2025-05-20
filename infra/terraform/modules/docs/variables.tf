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
variable "efs_id" {
  type = string
}
variable "efs_access_point_id" {
  type = string
}
variable "docs_target_group_arn" {
  type = string
}
