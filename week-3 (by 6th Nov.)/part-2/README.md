# Week 3 - Part 2

## Docker (cont.)

Refer to [Stylish UI](https://www.figma.com/file/sKhc4A0Gi427u1I5leT5ug/STYLiSH), we'll need to complete below jobs:

1. Create a blank page using the React layout, including a header and footer.
2. Use the Nginx Docker image to connect the frontend and backend. (If you don't use the web server, just skip it.)
3. The backend container's port will not be visible externally, and the service can only be accessed through Nginx.

[logo and icons](https://s3.amazonaws.com/appworks-school-stylish/images.zip) are ready to use.

## Advanced Optional

## Docker swarm

Docker Swarm is a simple clustering tool for Docker. It can be more easily used to deploy and manage containerized applications at scale.

What to Do:

1. Use Docker Swarm stack to deploy all your containers.
2. Add a deployment action to your Github Action file.

## 💡 Recap

1. Assuming that we need to deploy three backend containers on two VMs, what potential issues may arise, and how can we address them?
2. What is a web server, such as Nginx, and what functions can it perform?
3. In what situations do we require the use of a container orchestration tool like Docker Swarm?
