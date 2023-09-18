# **Week 5 - Part 1**

## **Overview of What We Should Complete This Week**

### **Continuous Integration and Continuous Delivery (CI/CD)**

CI/CD stands as a transformative practice in software development. It embodies a philosophy where software changes and updates are routinely crafted, validated, and released, allowing for more frequent, meaningful, and rapid development cycles. This week, our objective is to automate our service deployment, harnessing the power of CI/CD.

## **Today's Focus**

### **Establishing the GitHub Actions Workflow**

The process will be initiated upon the triggering events: either a merge or a push of new code to the `main` branch on GitHub.

Outlined below is the expected flow of the GitHub Actions workflow:

1. Commit and push the latest code changes to the `main` branch on GitHub.
2. Package your application within a Docker container and push it to Docker Hub.
3. On your EC2 instance, pull manually the recently pushed Docker image from Docker Hub and execute it.
4. Validate and ensure that the Docker container on the EC2 instance has successfully updated and is running as expected.

## **Advanced Optional**

Jenkins is an open-source automation server that facilitates continuous integration and continuous delivery (CI/CD). With its robust set plugins and integrations, Jenkins offers a versatile platform to automate various phases of a project's development cycle. How can Jenkins be leveraged to automate the process of Docker image building and pushing? Try implementing it yourself for hands-on experience and a deeper understanding.