# Blueimp Wistia Upload

## Description

[AngularJS](https://angularjs.org/) directive to upload videos to [Wistia](http://wistia.com/) using [Blueimp jQuery Uploader](https://github.com/blueimp/jQuery-File-Upload).

## How to use

Include stylesheets at the header of your page:

```html
<head>
  ...
  <!-- VENDOR STYLES -->
  <link rel="stylesheet" href="vendor/bootstrap/bootstrap-3.3.6.min.css">
  
  <!-- APP STYLES -->
  <link rel="stylesheet" href="style.css">
  ...
</head>
```

Include libraries and use the **uploadfile** tag with your Wistia api key at the body of your page:

```html
<body>
  ...
  <!-- DIRECTIVE IN ACTION  -->
  <uploadfile id="fileupload" wistiapass="your-wistia-api-password" />
  
  <!-- VENDOR LIBRARIES -->
  <script src="vendor/jquery/jquery-1.11.3.min.js"></script>
  <script src="vendor/blueimp/jquery.ui.widget.js"></script>
  <script src="vendor/blueimp/jquery.iframe-transport.js"></script>
  <script src="vendor/blueimp/jquery.fileupload.js"></script>
  <script src="vendor/angular/angular-1.3.15.min.js"></script>
  <script src="vendor/bootstrap/bootstrap-3.3.6.min.js"></script>

  <!-- APP LIBRARIES -->
  <script src="app.js"></script>
  <script src="uploadFileDirective.js"></script>
</body>
```



