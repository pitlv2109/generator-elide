const generator = require('./generator');

const srcJavaPath = 'src/main/java';

const choicesArr = [
  'String',
  'Int',
  'Short',
  'Float',
  'Double',
  'Long',
  'Long long',
  'Boolean',
  'Char'
];

const models = [];

let newModelAttributes = {
  name: '',
  fields: []
};

const fieldPrompt = (yo, projectName, packageName, pomObj) => {
	return yo.prompt([{
		type: 'input',
		name: 'name',
		message: 'Field name?'
	}, {
		name: 'type',
		message: 'What type?',
		type: 'list',
		choices: choicesArr
	}]).then((model) => {
		newModelAttributes.fields.push({
      name: model.name,
      type: model.type
    });
		yo.prompt([{
			type: 'confirm',
			name: 'continue',
			message: 'Add another field?'
		}]).then((response) => {
			if (response.continue) {
				fieldPrompt(yo, projectName, packageName, pomObj);
			} else {
				models.push(newModelAttributes);
				choicesArr.push(newModelAttributes.name);
				newModelAttributes = {
          name: '',
          fields: []
        };
				yo.prompt([{
						type: 'confirm',
						name: 'addAnother',
						message: 'Add another model?'
				}]).then((answer) => {
					if(answer.addAnother) {
						modelPrompt(yo, projectName, packageName, pomObj);
					} else {
						createModels(yo, projectName, packageName, pomObj)
					}
				});
			}
		});
	});
}

const modelPrompt = (yo, projectName, packageName, pomObj) => {
	yo.prompt([{
		type: 'input',
		name: 'name',
		message: 'Model name?'
	},]).then((model) => {
		newModelAttributes.name = model.name;
		fieldPrompt(yo, projectName, packageName, pomObj);
	});
}

const createModels = (yo, projectName, packageName, pomObj) => {
	const file = packageName.split('.').join('/')
	models.forEach((model) => {
    const newModel = Object.assign(model, { groupId: packageName });
    yo.fs.copyTpl(
      yo.templatePath(`${srcJavaPath}/models/Model.java`),
      yo.destinationPath(`${projectName}/src/main/java/${file}/models/${model.name}.java`),
      newModel
    );
  });

  generator.generateNewProject(yo, pomObj);
}

module.exports = {
  modelPrompt,
  newModelAttributes
}
