aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 510722588970.dkr.ecr.us-west-2.amazonaws.com
docker tag rjcapuchin/ron_playground 510722588970.dkr.ecr.us-west-2.amazonaws.com/images
docker push 510722588970.dkr.ecr.us-west-2.amazonaws.com/images