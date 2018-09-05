# Thoughts

I had initially been using the sample apps in their locations in the source repos, however, I found it cumbersome keeping the paths correct, and having to build the client.
So, in order to may it easier to use the samples, I move sample source to it's own repo and included the modules as dependencies within their respective samples.
Also, since there are requirements of the server to have both mongodb and redis running, I set the up using a docker-compose file.
The containers running the client and server apps, mounts the app source code, to allow using the samples as the initial setup for a new project.

