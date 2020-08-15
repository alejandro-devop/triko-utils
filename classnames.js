/**
 * This helper function allows to getStyles from multiple classes
 * depending on conditions (It also overrides classes)
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param classesToApply Object which specifies which classes are going to be applied.
 * @param classes Array which contain the classes objects with the keys to be applied.
 * @param override Classes that will override all class names.
 * @returns {[]}
 */
const classNames = (classesToApply = {}, classes = [], override = {}) => {
  if (Array.isArray(classes)) {
    classes = classes.reduce((object, item) => {
      object = {
        ...object,
        ...item,
      };
      return object;
    }, {});
  }
  const classKeys = Object.keys(classes);
  const classesOutput = [];
  classKeys.forEach(className => {
    if (classesToApply[className] === true) {
      classesOutput.push(classes[className]);
    }
  });
  classesOutput.push(override);
  return classesOutput;
};

export default classNames;
