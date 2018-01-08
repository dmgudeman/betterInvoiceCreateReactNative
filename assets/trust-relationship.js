{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "ForAnyValue:StringLike": {
        "cognito-identity.amazonaws.com:amr": "graph.facebook.com"
      },
    },
  ],
}
