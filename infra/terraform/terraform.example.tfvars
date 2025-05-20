aws_region = "us-east-1"

auth_api_image_url       = "123456789012.dkr.ecr.us-east-1.amazonaws.com/auth-api:latest"
channels_api_image_url   = "123456789012.dkr.ecr.us-east-1.amazonaws.com/channels-api:latest"
broadcasts_api_image_url = "123456789012.dkr.ecr.us-east-1.amazonaws.com/broadcasts-api:latest"
user_api_image_url       = "123456789012.dkr.ecr.us-east-1.amazonaws.com/user-api:latest"
dwitch_frontend_image_url = "123456789012.dkr.ecr.us-east-1.amazonaws.com/dwitch-frontend:latest"

auth_database_url       = "postgresql://user:password@auth-db-host:5432/authdb"
channels_database_url   = "postgresql://user:password@channels-db-host:5432/channelsdb"
broadcasts_database_url = "postgresql://user:password@broadcasts-db-host:5432/broadcastsdb"
user_database_url       = "postgresql://user:password@user-db-host:5432/userdb"

rabbitmq_url = "amqp://guest:guest@rabbitmq-host:5672"
