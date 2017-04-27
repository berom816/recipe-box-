'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//ocmponent, showing the ingredient list

var IngredientList = function (_React$Component) {
  _inherits(IngredientList, _React$Component);

  function IngredientList() {
    _classCallCheck(this, IngredientList);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.incomingChange = _this.incomingChange.bind(_this);
    _this.renderInDiv = _this.renderInDiv.bind(_this);
    _this.renderInput = _this.renderInput.bind(_this);
    _this.deleteIngredient = _this.deleteIngredient.bind(_this);
    return _this;
  }

  //handle the ingredient that user type in

  IngredientList.prototype.incomingChange = function incomingChange(e) {
    this.props.onHigherLevelChange(this.props.index2, this.props.passInIndex, e.target.value);
  };

  //handle deleting ingredient by invoking passed in functoin

  IngredientList.prototype.deleteIngredient = function deleteIngredient() {
    this.props.removeIngredientRecipe(this.props.index2, this.props.passInIndex);
  };

  //display ingredient without user editing it

  IngredientList.prototype.renderInDiv = function renderInDiv() {
    return React.createElement(
      'div',
      { className: 'individualIngredientDiv' },
      this.props.passedValue
    );
  };

  //display ingredient in edit mode, allowing user to make change to the ingredient

  IngredientList.prototype.renderInput = function renderInput() {
    return React.createElement(
      'div',
      { className: 'input-group' },
      React.createElement(
        'span',
        { className: 'input-group-btn' },
        React.createElement(
          'button',
          { className: 'btn btn-danger btn-md xButton', onClick: this.deleteIngredient },
          ' X '
        )
      ),
      React.createElement('input', { type: 'text', placeholder: 'Enter one ingredient', className: 'form-control', value: this.props.passedValue, onChange: this.incomingChange })
    );
  };

  IngredientList.prototype.render = function render() {
    if (this.props.onEditing) {
      return this.renderInput();
    } else {
      return this.renderInDiv();
    }
  };

  return IngredientList;
}(React.Component);

//component, hold each recipe

var Recipe = function (_React$Component2) {
  _inherits(Recipe, _React$Component2);

  function Recipe() {
    _classCallCheck(this, Recipe);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.state = {
      showIngredient: false,
      editing: false
    };
    _this2.assembleIngredients = _this2.assembleIngredients.bind(_this2);
    _this2.handleDishNameChange = _this2.handleDishNameChange.bind(_this2);
    _this2.handleDishIngredientChange = _this2.handleDishIngredientChange.bind(_this2);
    _this2.renderDishTitle = _this2.renderDishTitle.bind(_this2);
    _this2.renderShowIngredient = _this2.renderShowIngredient.bind(_this2);
    _this2.toShowIngredient = _this2.toShowIngredient.bind(_this2);
    _this2.changeEdit = _this2.changeEdit.bind(_this2);
    _this2.renderButtons = _this2.renderButtons.bind(_this2);
    _this2.handleDeleteRecipe = _this2.handleDeleteRecipe.bind(_this2);
    _this2.handleAddIngredient = _this2.handleAddIngredient.bind(_this2);
    return _this2;
  }

  //handle the recipe's name change by invoking passed in prop function

  Recipe.prototype.handleDishNameChange = function handleDishNameChange(e) {
    this.props.changeNameState(this.props.index, e.target.value);
  };

  //handle the ingredients change

  Recipe.prototype.handleDishIngredientChange = function handleDishIngredientChange(indexFromLower, indexOfIngred, e) {
    this.props.changeIngredientState(this.props.index, indexOfIngred, e);
  };

  //assembling each ingredient of the recipe, passing it down to ingredientList

  Recipe.prototype.assembleIngredients = function assembleIngredients(ingredientsIndiv, z) {
    return React.createElement(IngredientList, {
      index2: this.props.index,
      passInIndex: z,
      passedValue: ingredientsIndiv,
      onHigherLevelChange: this.handleDishIngredientChange,
      onEditing: this.state.editing,
      removeIngredientRecipe: this.props.removeIngredient });
  };

  //changes the state of showing ingredient or not

  Recipe.prototype.toShowIngredient = function toShowIngredient() {
    this.setState({
      showIngredient: !this.state.showIngredient
    });
  };

  //change whether in edit mode

  Recipe.prototype.changeEdit = function changeEdit() {
    this.props.eraseEmptyIngredient();
    this.setState({
      editing: !this.state.editing
    });
  };

  //render just the dish title, not showing the ingredients

  Recipe.prototype.renderDishTitle = function renderDishTitle() {
    if (this.state.editing) {
      return React.createElement(
        'div',
        { className: 'dishTitle' },
        React.createElement('input', { className: 'dishTitleInput', value: this.props.recipeName, onChange: this.handleDishNameChange })
      );
    } else {
      return React.createElement(
        'div',
        { className: 'dishTitle', onClick: this.toShowIngredient },
        this.props.recipeName
      );
    }
  };

  //handle deleting recipe by invoking removeRecipe

  Recipe.prototype.handleDeleteRecipe = function handleDeleteRecipe() {
    this.props.removeRecipe(this.props.index);
  };

  //handle adding ingredients by invoking addIngredientProp

  Recipe.prototype.handleAddIngredient = function handleAddIngredient() {
    this.props.addIngredientProp(this.props.index);
  };

  //render different button options to user depending on edit mode or not

  Recipe.prototype.renderButtons = function renderButtons() {
    if (this.state.editing) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'btn btn-info btn-margin plusButton', onClick: this.handleAddIngredient },
          React.createElement('i', { className: 'fa fa-plus' })
        ),
        React.createElement(
          'button',
          { className: 'btn btn-success btn-margin', onClick: this.changeEdit },
          'Save'
        )
      );
    } else {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'btn btn-info btn-margin editButton', onClick: this.changeEdit },
          'Edit'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-danger btn-margin', onClick: this.handleDeleteRecipe },
          'Delete'
        )
      );
    }
  };

  //show the ingredients

  Recipe.prototype.renderShowIngredient = function renderShowIngredient() {
    return React.createElement(
      'div',
      null,
      this.renderDishTitle(),
      React.createElement(
        'p',
        null,
        'Ingredients'
      ),
      this.props.ingredients.map(this.assembleIngredients),
      this.renderButtons()
    );
  };

  Recipe.prototype.render = function render() {
    if (this.state.showIngredient) {
      return this.renderShowIngredient();
    } else {
      return this.renderDishTitle();
    }
  };

  return Recipe;
}(React.Component);

//component, controlls the whole board of recipes

var Board = function (_React$Component3) {
  _inherits(Board, _React$Component3);

  function Board() {
    _classCallCheck(this, Board);

    //check the user's browser local storage, as recipes users created will be saved in browser, and if exist, show those saved recipe

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this));

    if (localStorage.berom816_recipeList) {
      _this3.state = {
        //recipeList array, holding objects, each object holds property 'recipe' for recipe name and 'ingred', an array for the recipe ingredients
        recipeList: JSON.parse(localStorage.berom816_recipeList)
      };
    } else {
      //if never visited before, save to local storage an empty recipeList
      localStorage.berom816_recipeList = "[]";
      _this3.state = {
        recipeList: []
      };
    }

    _this3.forEachRecipe = _this3.forEachRecipe.bind(_this3);
    _this3.handleRecipeNameChange = _this3.handleRecipeNameChange.bind(_this3);
    _this3.handleIngredientChange = _this3.handleIngredientChange.bind(_this3);
    _this3.deleteRecipe = _this3.deleteRecipe.bind(_this3);
    _this3.addIngredient = _this3.addIngredient.bind(_this3);
    _this3.removeIndivIngredient = _this3.removeIndivIngredient.bind(_this3);
    _this3.addNewRecipe = _this3.addNewRecipe.bind(_this3);
    _this3.removeEmptyIngred = _this3.removeEmptyIngred.bind(_this3);
    return _this3;
  }

  //handle the ingredient changes at appropriate place of recipeList array, update state to re-render and save to local storage

  Board.prototype.handleIngredientChange = function handleIngredientChange(a, b, val) {
    var arr = this.state.recipeList;
    arr[a].ingred[b] = val;
    localStorage.berom816_recipeList = JSON.stringify(this.state.recipeList);
    this.setState({
      recipeList: arr
    });
  };

  //handle the recipe name changes at appropriate place of recipeList array, update state to re-render and save to local storage

  Board.prototype.handleRecipeNameChange = function handleRecipeNameChange(i, val) {
    var arr = this.state.recipeList;
    arr[i].recipe = val;
    localStorage.berom816_recipeList = JSON.stringify(this.state.recipeList);
    this.setState({
      recipeList: arr
    });
  };

  //handle the delete of recipe at appropriate place of recipeList array, update state to re-render and save to local storage

  Board.prototype.deleteRecipe = function deleteRecipe(i) {
    var arr = this.state.recipeList;
    arr.splice(i, 1);
    localStorage.berom816_recipeList = JSON.stringify(this.state.recipeList);
    this.setState({
      recipeList: arr
    });
  };

  //handle the addition of recipe to recipeList array, update state to re-render and save to local storage

  Board.prototype.addNewRecipe = function addNewRecipe() {
    var arr = this.state.recipeList;
    var recipeObj = {};
    recipeObj.recipe = 'Recipe Name';
    recipeObj.ingred = [];
    arr.push(recipeObj);
    localStorage.berom816_recipeList = JSON.stringify(this.state.recipeList);
    this.setState({
      recipeList: arr
    });
  };

  //handle the addition of empty ingredient at appropriate place of recipeList array, update state to re-render and save to local storage

  Board.prototype.addIngredient = function addIngredient(indexOfRecipeName) {
    var arr = this.state.recipeList;
    arr[indexOfRecipeName].ingred.push('');
    localStorage.berom816_recipeList = JSON.stringify(this.state.recipeList);
    this.setState({
      recipeList: arr
    });
  };

  //handle the delete of ingredient at appropriate place of recipeList array, update state to re-render and save to local storage

  Board.prototype.removeIndivIngredient = function removeIndivIngredient(indexOfRecipeName, indexOfIngredientArr) {
    var arr = this.state.recipeList;
    arr[indexOfRecipeName].ingred.splice(indexOfIngredientArr, 1);
    localStorage.berom816_recipeList = JSON.stringify(this.state.recipeList);
    this.setState({
      recipeList: arr
    });
  };

  //when user added empty ingredients, but remains empty when clicking save, the empty ingredients will be deleted
  //update state to re-render and save to local storage

  Board.prototype.removeEmptyIngred = function removeEmptyIngred() {
    var arr = this.state.recipeList;
    var holdIngred = [];
    for (var a = 0; a < arr.length; a++) {
      for (var b = 0; b < arr[a].ingred.length; b++) {
        if (arr[a].ingred[b] !== '') {
          holdIngred.push(arr[a].ingred[b]);
        }
      }
      arr[a].ingred = holdIngred;
      holdIngred = [];
    }
    localStorage.berom816_recipeList = JSON.stringify(this.state.recipeList);
    this.setState({
      recipeList: arr
    });
  };

  //handle each recipe, passing it down to Recipe component

  Board.prototype.forEachRecipe = function forEachRecipe(keis, i) {
    return React.createElement(
      'div',
      { className: 'recipeCard' },
      React.createElement(Recipe, {
        index: i,
        recipeName: keis.recipe,
        ingredients: keis.ingred,
        changeNameState: this.handleRecipeNameChange,
        changeIngredientState: this.handleIngredientChange,
        removeRecipe: this.deleteRecipe,
        addIngredientProp: this.addIngredient,
        removeIngredient: this.removeIndivIngredient,
        eraseEmptyIngredient: this.removeEmptyIngred })
    );
  };

  Board.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'app' },
      this.state.recipeList.map(this.forEachRecipe),
      React.createElement(
        'button',
        { className: 'btn btn-primary addRecipeBtn', onClick: this.addNewRecipe },
        'Add Recipe'
      ),
      React.createElement(
        'div',
        { className: 'message' },
        'The recipes you create will be saved in your browser'
      )
    );
  };

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.getElementById('root'));