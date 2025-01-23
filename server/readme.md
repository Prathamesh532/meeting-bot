### DB Connection
-   mongoose gave a **.connect **function which take the args(URL , Options)

- **process.exit()** : method in Node.js used to terminate the Node.js process programmatically
    Common Exit Codes:
**0**: Success.
**1**: General failure or unspecified error.
**2**: Misuse of shell built-ins (e.g., invalid usage of a command).
**126**: Command invoked cannot execute.
**127**: Command not found.
**128**: Invalid argument to exit().
**greater than 128**: Termination due to a signal (e.g., 130 for Ctrl+C, which is signal 2 + 128).


### Features of npm multer
- **File Uploads**: Allows uploading files from client-side forms to the server.
- **Middleware**: Integrates seamlessly with Express.js middleware, making it easy to handle file uploads within routes.
- **File Storage**: Provides options for storing uploaded files on the server, such as in-memory storage, disk storage, or using a custom storage engine.
- **File Filtering**: Supports filtering uploaded files based on file type, size, and other criteria.
-**Error Handling**: Offers error handling for file uploads, including handling file size limits, invalid file types, and other upload-related errors.

Multer in Node.js is a middleware that is used for the easy handling of multipart/form data that is used when file uploading is done. To get maximum efficiency, Multer has been built on the top of a busboy, a node.js module that is used to handle incoming HTML form data in requests. Multer is similar to the body parser in Node.js (an express middleware) in functionality, but it only supports the multipart data.

When we create any form in HTML, by default, the value of ENCTYPE attribute is application/x-www-form-urlencoded. The ENCTYPE attribute specifies how the form data is encoded when the data is sent in the request. The default content-type encodes the data in the form of key-value pairs. This type of a structure is not capable of supporting the file upload operation.

The multipart/form-data is a content-type that makes the browsers encode the form data in the format of a multipart message. Each part in this consists of a text input and a file input for representing each field in the form.

Multer is widely used because it is simple, very efficient, and also supports multiple file uploads. Multer manipulates the request object by adding two objects to it - namely the body object and file/files objects. The body object added by Multer contains the data from the text fields in the HTML form. The file or file object contains the files that are uploaded in the form. They can be accessed as req.body and req.file or req.files where req is the request object.

Processing of only multipart data (multipart/form-data) can be done with the help of Multer. No other format can be processed. In this article, you will learn how you can use Multer in Node.js to ease out the process of handling multiple file uploads. Multer also provides a lot of options or settings that are applied during the file storage.

https://www.scaler.com/topics/nodejs/multer-in-node-js/