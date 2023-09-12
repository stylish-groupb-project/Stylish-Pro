# Week 0 Part 1

## Learn Git and GitHub

* [GitHub Training & Guides](https://www.youtube.com/watch?v=FyfwLX4HAxM&list=PLg7s6cbtAD15G8lNyoaYDuKZSKyJrgwB-&index=1) (Video)
* [Try git](https://try.github.io)
* [GitHub Guides](https://guides.github.com)

## Tips for Git

Followings are some tips you had better follow when working with git.
* Clear commit message.
* Commit should have the format like `<type>(<scope>): <subject>`, e.g., `feat(w1p1): add product list api`.
  * `type` (required)
    You need to choose one of the below:
    * **build** (changes that affect the build system or external dependencies)
    * **feat** (new feature)
    * **fix** (bug fix)
    * **docs** (changes to documentation)
    * **style** (formatting, missing semi colons, etc; no code change)
    * **refactor** (refactoring production code)
    * **test** (adding missing tests, refactoring tests; no production code change)
    * **chore** (updating grunt tasks etc; no production code change)
  * `scope` (optional)  
    Scope could be anything specifying place of the commit change.
  * `subject` (required)
    * ENGLISH ONLY
    * less than 50 characters
    * don’t capitalize the first letter
    * no dot (.) at the end
    * use the imperative, present tense: “change” not “changed” nor “changes”
* You can commit many times when developing, but you should use git rebase to merge multiple commits into one and write a clear commit message when creating pull request. [Git rebase](https://docs.github.com/en/get-started/using-git/about-git-rebase)
* For more useful git command, you can see [About Git](https://docs.github.com/en/get-started/using-git/about-git).  

Let's follow the rules from now on.  
Please note that besides the `type` and `subject`, `<scope>` is also mandatory during the whole stylish project.  
`<scope>` should be the abbreviation of the week number and the part number, e.g., `w0p1`, `w1p2`, or `w3p1`

## Coding Style

* [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

It is important to have a good coding style which not only will make the code easy to maintain but will allow others to better understand the content as well.
Here is the javascript coding style document released by Google. 
You should better follow the coding style from day1.

## Before assignment

From now on, we're going to start the project `stylish`.

1. Fork this repository in AppWorks School account to your GitHub account.
2. You will get a `forked repository` in your GitHub account.
3. We call this repository in AppWorks School `upstream repository`.
4. Clone your `forked repository` from GitHub to your local machine.
5. Create a `develop` branch from `main` branch in your local machine.
6. Change your current branch from `main` to `develop` in your local machine.  

## Assignment

Every time before you start a new assignment, please create a new **assignment branch** from the **develop** branch with the following rules and complete the assignment on that branch.

```
Assignment branch naming rules:

  week_[week number]_part_[part number]

Ex: For week 0 part 1

  => week_0_part_1
```

1. Create a subfolder named **stylish** under the **workspace/[your_name]** folder.
2. Modify **README.md** file, write down **your name** in this file.
3. Make your first commit for the changes using git.
4. Push **current assignment branch** to `your forked repository`.  

**Note:** Please follow the git commit rules.

****

## How to hand-in?

Please find the **assignment branch** on your `forked repository` and make a pull request from this branch to `[your_name]` of the `upstream repository`. (Please **NEVER** make a pull request to the main branch of the `upstream repository`)

```
Ex: 
Addie hand-in the assignment for week 0 part 1.

Create pull request: 
base repository: AppWorks-School-Materials/Campus-Program04  base: addie_develop
<-
head repository: addie-tyc/Campus-Program04  compare: week_0_part_1
```

You should check your email for tracking the status of pull request. If your pull request is not accepted by repository host, it means that the assignment have issues should be fix. I will mention the issues in the comment.

Please fix the issues and push new commits to the same assignment branch. The pull request will automatically update itself, so you don't have to create another pull request for the same assignment.

## 💡 Recap
1. How do we solve the the deployment issue step by step (it works on my machine, but ...)?
2. What is git flow/github flow?
