#!/bin/bash
docker build . -t rjcapuchin/ron_playground
docker tag rjcapuchin/ron_playground:latest 510722588970.dkr.ecr.us-west-2.amazonaws.com/images:latest
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 510722588970.dkr.ecr.us-west-2.amazonaws.com
docker push 510722588970.dkr.ecr.us-west-2.amazonaws.com/images:latest