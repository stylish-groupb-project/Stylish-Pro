# **Week 4 - Part 2**

## **Overview of What We Should Complete This Week**

### Authorization

In this phase of our project, security takes the center stage. It is paramount that not everyone has unrestricted access to critical parts of our application, like the admin page. The solution lies in a concept known as 'Authorization'. At the heart of this lies the idea that each user should have a designated **`role`**, which clearly demarcates their privileges and access rights. There are various strategies to implement this:

- ACL (Access Control List)
- RBAC (Role-Based Access Control)
- ABAC (Attribute-Based Access Control)

For our 'Stylish' project, we'll harness the power and simplicity of **RBAC**.

### Cache

Cache is a technology designed to temporarily store frequently accessed data or previously computed results to speed up subsequent requests. By leveraging caching, systems can avoid redundant computations or data retrievals from distant sources, enhancing performance and response times. In web and application contexts, caching contributes to resource conservation and a smoother user experience.

## **Today's Focus**

### Authorization

**Roles Setting**

Our application is fairly straightforward in terms of roles. We have:

- `user`: The general user who uses our platform for shopping or browsing.
- `admin`: This is a privileged role, typically reserved for system administrators who have the power to make system-level changes.

Your first task is to assign roles. Make your own account an `admin`, while ensuring that every other account defaults to the `user` role.

Navigating User Roles

Consider a scenario where a user attempts to access admin-specific pages. There can be three possible scenarios:

1. Unsigned User:
    - If the user hasn't signed in yet, we respond with an HTTP status code of `401 Unauthorized`.
2. Signed-In User with 'User' Role:
    - A user who is signed in but isn't an `admin` should be given an HTTP status code of `403 Forbidden` if they try to access an admin page.
3. Signed-In Admin:
    - An `admin` can seamlessly access the admin pages without any hindrance.

The exclusive admin realms in our application include:

- **/admin/checkout.html**: A dedicated portal for checkout procedures and testing.
- **/admin/product.html**: A page where product-related activities and management take place.

### **Redis Cache Mechanism**

Redis is an in-memory data structure store that can be used as a database, cache, and message broker. By caching frequently-accessed data, you can significantly reduce the load on your databases and improve the response times of your applications.

- Set up and configure Redis.
- Implement a simple caching strategy to improve API response times.
    1. Incorporate a caching mechanism within the `Product Details API` using Redis.
    2. Upon a successful checkout, it's crucial to update the quantity of the product in the cache to reflect the most recent inventory status.

## **Advanced Optional**

1. What are the differences between ACL, RBAC, and ABAC? If there's a super admin, and other admins are invited by this super admin, how should such a model be designed? How would you implement it?
2. AWS offers the ElastiCache service, which supports scalable in-memory caching environments using Redis. By integrating with ElastiCache, you can bypass certain deployment steps, reduce server load, and enhance both stability and performance of your applications.