const generateExampleProject = (yo, projectName) => {
  const file = projectName.split('.').join('/');
  // Create the main.java file
  yo.fs.copyTpl(
    yo.templatePath('main.java'),
    yo.destinationPath('elide-blog-example/src/main/java/' + file + '/Main.java'),
    {groupId : projectName}
  );
  yo.fs.copyTpl(
    yo.templatePath('blog-example/ElideResourceConfig.java'),
    yo.destinationPath('elide-blog-example/src/main/java/' + file + '/ElideResourceConfig.java'),
    {groupId : projectName}
  );

  // Init the models folder blog-example
  yo.fs.copyTpl(
    yo.templatePath('blog-example/Comment.java'),
    yo.destinationPath('elide-blog-example/src/main/java/' + file + '/models/Comment.java'),
    {}
  );
  yo.fs.copyTpl(
    yo.templatePath('blog-example/Post.java'),
    yo.destinationPath('elide-blog-example/src/main/java/' + file + '/models/Post.java'),
    {}
  );
  yo.fs.copyTpl(
    yo.templatePath('blog-example/Role.java'),
    yo.destinationPath('elide-blog-example/src/main/java/' + file + '/models/Role.java'),
    {}
  );
  yo.fs.copyTpl(
    yo.templatePath('blog-example/User.java'),
    yo.destinationPath('elide-blog-example/src/main/java/' + file + '/models/User.java'),
    {}
  );

  // Don't know what this is
  yo.fs.copyTpl(
    yo.templatePath('blog-example/hibernate.cfg.xml'),
    yo.destinationPath('elide-blog-example/src/main/resources/hibernate.cfg.xml'),
    {}
  );
  yo.fs.copyTpl(
    yo.templatePath('blog-example/log4j2.xml'),
    yo.destinationPath('elide-blog-example/src/main/resources/log4j2.xml'),
    {}
  );

  yo.fs.copyTpl(
    yo.templatePath('blog-example/load_blog.sh'),
    yo.destinationPath('elide-blog-example/src/main/scripts/load_blog.sh'),
    {}
  );

  // create the pom files
  yo.fs.copyTpl(
    yo.templatePath('pom.xml'),
    yo.destinationPath('elide-blog-example/pom.xml'),
    {
      artifactId: 'elide-blog-example',
      groupId: 'com.yahoo.elide',
      name: 'Elide Example: Hibernate5 API with Security',
      version: '3.0.5-SNAPSHOT',
      description: 'lide example using javax.persistence, MySQL and Elide Security'
    }
  );
}

const generateNewProject = (yo, projectName, packageName, pomObj) => {
  const file = packageName.split('.').join('/');
  const destJavaPath = `${projectName}/src/main/java`;
  const destResourcePath = `${projectName}/src/main/resources`;

  yo.fs.copyTpl(
    yo.templatePath('main.java'),
    yo.destinationPath(`${destJavaPath}/${file}/Main.java`),
    { groupId : packageName }
  );

  yo.fs.copyTpl(
    yo.templatePath('blog-example/ElideResourceConfig.java'),
    yo.destinationPath(`${destJavaPath}/${file}/ElideResourceConfig.java`),
    { groupId : packageName }
  );

  yo.fs.copyTpl(
    yo.templatePath('blog-example/hibernate.cfg.xml'),
    yo.destinationPath(`${destResourcePath}/hibernate.cfg.xml`),
    {}
  );

  yo.fs.copyTpl(
    yo.templatePath('blog-example/log4j2.xml'),
    yo.destinationPath(`${destResourcePath}/log4j2.xml`),
    {}
  );

  yo.fs.copyTpl(
    yo.templatePath('blog-example/load_blog.sh'),
    yo.destinationPath(`${projectName}/src/main/scripts/load_blog.sh`),
    {}
  );

  yo.fs.copyTpl(
    yo.templatePath('pom.xml'),
    yo.destinationPath(`${projectName}/pom.xml`),
    pomObj
  );
}

module.exports = {
  generateExampleProject,
  generateNewProject
}
