# Week 3 Part 1

## Docker

Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.  
For this part, we have to run backend server on EC2 machines by docker.  
After the containerization, the CI/CD workflow would be more versatile.

What to Do:

1. Run backend server in a docker container.
2. Make sure your web server (e.g. nginx) or the clients can find

### Note

Data will lose after closing container, how to resolve it?

**Hint:**

1. What is `docker volume`?
2. (advanced) Another solution is to use AWS services to store data like logs and images.

## Advanced Optional

### Continuous Integration / Continuous Delivery

CI/CD is a way of developing software in which you’re able to release updates at any time in a sustainable way. When changing code is routine, development cycles are more frequent, meaningful and faster. In this part, we have to deploy our service automatically.

#### Set up The GitHub Actions workflow

Trigger on: merge or push your new code to Github on **main** branch

Set up the GitHub Actions workflow, and the success flow will be:

1. Push your new code to Github on main branch
2. Push your docker to dockerhub.
3. Pull your docker from dockerhub on your EC2 machine and run it.

Ideally, we would run automated tests and deploy them first to the test environment before deploying to the production environment.  
For now, we can test on our local machines, but it's important to be aware of any differences between the local machine and the VM.

## 💡 Recap

1. What is containerization, and what are its benefits?
2. Image vs. Container?
3. What is Docker volume, what is its purpose and when to use it?
4. What is CI/CD, and what are its benefits?
