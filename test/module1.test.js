describe('Module 01 - SVG Library', () => {
  const svgelement = ast.findClass('SVGElement');
  const symbol = ast.findClass('Symbol');
  const sight = ast.findClass('Sight');

  it('Should have a `SVGElement` class. @svgelement-class', () => {
    assert(svgelement.length, 'Have you created the `SVGElement` class?');
  });

  it('`SVGElement` class should have a `constructor`. @svgelement-constructor', () => {
    assert(svgelement.length, 'Have you created the `SVGElement` class?');

    const svgelement_constructor = svgelement.findMethod('constructor');
    assert(svgelement_constructor.length, 'Does the `SVGElement` class have a `constructor`?');
    const params = svgelement_constructor.findParams();
    assert(params.length != 0 && params[0].name == 'type', 'Does the `SVGElement` class `constructor` have a parameter of `type`?');

    const constructor_assignments = svgelement_constructor.findAssignments();
    const type = constructor_assignments.classVariable('type');
    const type_right = type.length ? type.get().parent.value.right.name : false;
    assert(type_right == 'type', 'Have you set `this.type` equal to `type`?');

    const node = constructor_assignments.classVariable('node').at(0);
    assert(node.length, 'Are you setting `this.node`?');

    const create_element = svgelement_constructor.findCall('createElementNS');
    const create_element_left = create_element.length ? create_element.get().parent.value.left : false;
    const create_element_right = create_element.length ? create_element.get().parent.value.right : false;

    assert(create_element_left &&
           create_element_right &&
           create_element_left.object.type == 'ThisExpression' && 
           create_element_left.property.name == 'node' && 
           create_element_right.callee.object.name == 'document', 'Are you assigning `this.node` a call to `document.createElementNS()`?');

    assert(create_element_right.arguments.length >= 1 &&
           create_element_right.arguments[0].object.type == 'ThisExpression' &&
           create_element_right.arguments[0].property.name == 'namespace' &&
           create_element_right.arguments[1].object.type == 'ThisExpression' &&
           create_element_right.arguments[1].property.name == 'type', 'Are you passing `document.createElementNS()` the correct arguments?');

    const namespace = constructor_assignments.classVariable('namespace');
    const namespace_right = namespace.length ? namespace.get().parent.value.right.value : false;
    assert(namespace_right == 'http://www.w3.org/2000/svg', 'Have you set `this.namespace` equal to `http://www.w3.org/2000/svg`?');

    const return_statement = svgelement_constructor.findReturn();
    const return_right = return_statement.length ? return_statement.get().value.argument.type : false;
    assert(return_right == 'ThisExpression', 'Does the `SVGElement` `constructor` `return this`?');
  });

  it('`SVGElement` class should have an `attr` method. @attr-method', () => {
    assert(svgelement.length, 'Have you created the `SVGElement` class?');

    const attr = svgelement.findMethod('attr');
    const params = attr.findParams();
    assert(attr.length, 'Does the `SVGElement` class have a `attr` method?');
    assert(params.length != 0 && params[0].name == 'attrs', 'Does the `attr` method have a parameter of `attrs`?');

    const for_of = attr.findForOf();
    const for_of_left = for_of.length ? for_of.get().value.left : false;
    const for_of_right = for_of.length ? for_of.get().value.right : false;
    const for_of_body = for_of.length ? for_of.get().value.body.body[0].expression : false;

    assert(for_of_left &&
           for_of_left.declarations.length >= 1 &&
           for_of_left.declarations[0].id.type == 'ArrayPattern' &&
           for_of_left.declarations[0].id.elements[0].name == 'key' &&
           for_of_left.declarations[0].id.elements[1].name == 'value', 'Have you defined an array with `key` and `value` in the first part of the for loop?');

    assert(for_of_right &&
           for_of_right.type == 'CallExpression' &&
           for_of_right.callee.object.name == 'Object' &&
           for_of_right.callee.property.name == 'entries' &&
           for_of_right.arguments.length >= 1 &&
           for_of_right.arguments[0].name == 'attrs', 'Have you called the `Objects.entries()` function with the correct arguments?');

    assert(for_of_body &&
           for_of_body.callee.object.object.type == 'ThisExpression' &&
           for_of_body.callee.object.property.name == 'node' &&
           for_of_body.callee.property.name == 'setAttributeNS', 'In the body of the `for` loop do you have a call to `setAttributeNS()`?');

    assert(for_of_body &&
           for_of_body.arguments.length >= 1 &&
           for_of_body.arguments[0].value == null  &&
           for_of_body.arguments[1].name == 'key'  &&
           for_of_body.arguments[2].name == 'value', 'Does the `setAttributeNS()` function have the correct arguments?');

    const return_statement = attr.findReturn();
    const return_right = return_statement.length ? return_statement.get().value.argument.type : false;
    assert(return_right == 'ThisExpression', 'Does the `SVGElement` `constructor` `return this`?');
  });
  
  it('`SVGElement` class should have an `append` method. @append-method', () => {
    assert(svgelement.length, 'Have you created the `SVGElement` class?');

    const append = svgelement.findMethod('append');
    const params = append.findParams();
    assert(append.length, 'Does the `SVGElement` class have a `append` method?');
    assert(params.length != 0 && params[0].name == 'element', 'Does the `append` method have a parameter of `element`?');

    const parent_const = append.findVariable('parent');
    const parent_declarator = parent_const.length ? parent_const.get().value.declarations[0] : false;
    assert(parent_declarator.id.name == 'parent', 'Do you have a constant named `parent`?');

    const parent_conditional = parent_const.findConditional()
    const parent_test = parent_conditional.length ? parent_conditional.get().value.test : false;
    const parent_consequent = parent_conditional.length ? parent_conditional.get().value.consequent : false;
    const parent_alternate = parent_conditional.length ? parent_conditional.get().value.alternate : false;

    assert(parent_consequent &&
           parent_consequent.callee.object.name === 'document' &&
           parent_consequent.callee.property.name === 'querySelector', 'If the condition is `true` are you setting `parent` equal to a call to `document.querySelector()`?');

    assert(parent_consequent.arguments.length != 0 && parent_consequent.arguments[0].name === 'element', 'If the condition is `true`, are you passing `element` to a call to `document.querySelector()`?');
    assert(parent_alternate &&
           parent_alternate.object.name === 'element' &&
           parent_alternate.property.name === 'node', 'If the condition is `false` are you setting `parent` equal to `element.node`?');
    assert(parent_test.operator === '===', 'Are you using the strict equality operator `===`?');
    assert(parent_test.left.operator === 'typeof' && 
           parent_test.left.argument.name === 'element' && 
           parent_test.right.value === 'string', 'Does your conditional test if `element` is of the type `string`?');

    const ac = append.findCall('appendChild');
    const ac_callee = ac.length ? ac.get().value.callee : false;
    const ac_arguments = ac.length ? ac.get().value.arguments[0] : false;

    assert(ac_callee.object.name === 'parent' &&
           ac_arguments.object.type === 'ThisExpression' &&
           ac_arguments.property.name === 'node', 'Are you appending `this.node` to `parent`?');

    const return_statement = append.findReturn();
    const return_right = return_statement.length ? return_statement.get().value.argument.type : false;
    assert(return_right == 'ThisExpression', 'Does the `SVGElement` `constructor` `return this`?');
  });

  it('Should have a `Sight` class. @sight-class', () => {
    assert(sight.length, 'Have you created the `Sight` class?');
  });

  it('`Sight` class should have a `constructor`. @sight-constructor', () => {
    assert(sight.length, 'Have you created the `Sight` class?');

    const sight_constructor = sight.findMethod('constructor');
    assert(sight_constructor.length, 'Does the `Sight` class have a `constructor`?');
    const params = sight_constructor.findParams();
    assert(params.length && params[0].name == 'selector', 'Does the `Sight` class `constructor` have a parameter of `selector`?');
    assert(params.length && params[1].name == 'width', 'Does the `Sight` class `constructor` have a parameter of `width`?');
    assert(params.length && params[2].name == 'height', 'Does the `Sight` class `constructor` have a parameter of `height`?');

    const svg_assignment = sight_constructor.findAssignment('svg', true);
    assert(svg_assignment.length, 'Are you assigning the instance property `this.svg`?');

    const svg_new_match = {
      'type': 'NewExpression',
      'callee.name': 'SVGElement',
      'arguments.0.value': 'svg'
    };
    assert(match(svg_assignment.findNew(), svg_new_match), 'Are you assigning `this.svg` a `new SVGElement()` instance and are you passing in `svg`?');

    const svg_attr_match = {
      'arguments.0.type': 'ObjectExpression',
      'arguments.0.properties.0.key.name': 'viewbox',
      'arguments.0.properties.0.value.expressions.0.name': 'width',
      'arguments.0.properties.0.value.expressions.1.name': 'height',
      'arguments.0.properties.0.value.quasis.0.value.raw': '0 0 '
    };
    assert(match(svg_assignment.findCall('attr'), svg_attr_match), 'Are you chaining a call to `attr` on `new SVGElement()`? Are you passing in an object with a `viewbox` key and a value of ``0 0 ${width} ${height}``?');

    const svg_append_match = {
      'callee.property.name': 'append',
      'arguments.0.name': 'selector'
    };
    assert(match(svg_assignment.findCall('append'), svg_append_match), 'Are you chaining a call to `append` on `new SVGElement()`? Are you passing in `selector`?');
  });

  it('`Sight` class should have a `draw` method. @sight-draw', () => {
    assert(sight.length, 'Have you created the `Sight` class?');

    const draw = sight.findMethod('draw');
    assert(draw.length, 'Does the `Sight` class have a `draw` method?');
    const params = draw.findParams();
    assert(params.length && params[0].name == 'type', 'Does the `draw` method have a parameter of `type`?');
    assert(params.length && params[1].name == 'attrs', 'Does the `draw` method have a parameter of `attrs`?');

    const draw_return = draw.findReturn();
    const return_new = draw_return.findNew();
    const return_new_match = {
      'type': 'NewExpression',
      'callee.name': 'SVGElement',
      'arguments.0.name': 'type'
    };
    assert(match(return_new, return_new_match), 'Are you returning a `new SVGElement()` instance and are you passing in `type`?');

    const return_new_attr_match = {
      'type': 'CallExpression',
      'callee.property.name': 'attr',
      'arguments.0.name': 'attrs',
    };
    assert(match(draw_return.findCall('attr'), return_new_attr_match), 'Are you chaining a call to `attr` on `new SVGElement()`? Are you passing in `attrs`?');

    const return_new_append_match = {
      'type': 'CallExpression',
      'callee.property.name': 'append',
      'arguments.0.object.type': 'ThisExpression',
      'arguments.0.property.name': 'svg',
    };
    assert(match(draw_return.findCall('append'), return_new_append_match), 'Are you chaining a call to `append` on `new SVGElement()`? Are you passing in `this.svg`?');
  });

});