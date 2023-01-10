Types of bundlers:

- **react** – a bundler for React.js app
- **node** – a bundler for Node.js app

Example of using **react** bundler:

![bandler-react-usage-example](./doc/bandler-react-usage-example.png)

The `start` script launches the bundler executable file – `dwfeBundler`.  
The `start` script passes the bundler executable file the name of the settings based on which it needs to do its job.  
After launch, the bundler looks in the `package.json` file for settings in the predefined **dwfeBundlerOptions** field. In this example, these are settings named "opt".
