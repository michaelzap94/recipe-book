"use strict";

var Panel = ReactBootstrap.Panel;
var Accordion = ReactBootstrap.Accordion;
var PanelGroup = ReactBootstrap.PanelGroup;
var Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input;
var Popover = ReactBootstrap.Popover;
var Tooltip = ReactBootstrap.Tooltip;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Modal = ReactBootstrap.Modal;
var ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem;

if (!localStorage.getItem("Spaghetti (Default Example)")) {
  localStorage.setItem("Spaghetti (Default Example)", '[{"value":"Spaghetti (Default Example)"},{"value":"On medium heat melt the butter and sautee the onion and bell peppers. Add the hamburger meat and cook until meat is well done. Add the tomato sauce, salt, pepper and garlic powder. Salt, pepper and garlic powder can be adjusted to your own tastes. Cook noodles as directed. Mix the sauce and noodles if you like, I keep them separated."},{"value":"1 small onion (chopped)"},{"value":"1 bell pepper (chopped)"},{"value":"2 tablespoons garlic powder"},{"value":"1 -1 1⁄2 lb hamburger meat"},{"value":"1 tablespoon salt"},{"value":"2 (15 ounce) cans tomato sauce"},{"value":"1 (16 ounce) box spaghetti noodles"}]');
}

var ModalIngredients = React.createClass({
  displayName: "ModalIngredients",

  render: function render() {
    var _this = this;

    return React.createElement("input", { value: this.props.singleIngredient, onChange: function onChange(e) {
        return _this.props.updateValues(false, false, e.target.value);
      }, className: "list-group-item form-control", type: "text", name: "option[1]", placeholder: "Ingredient 1", required: true });
  }
});

var AddModal = React.createClass({
  displayName: "AddModal",

  onCreateRecipe: function onCreateRecipe() {
    var form = $('#createRecipe');
    var submit = $('#submitRecipe');
    var thisHide = this.props;
    form.on('submit', function (e) {
      e.preventDefault();
      var serializedForm = form.serializeArray();
      var title = serializedForm[0].value;
      localStorage.setItem(title, JSON.stringify(serializedForm));
      thisHide.handleRecipesArrUpdate(thisHide.fetchUserRecipes);
      thisHide.onHide();
    });
  },

  formLogicAddOption: function formLogicAddOption() {

    this.props.pollOptionInc++;

    var str = '<input class="optionalOption list-group-item form-control" type="text" name="option[' + this.props.pollOptionInc + ']" placeholder="Ingredient ' + this.props.pollOptionInc + '" required>';
    $("#optionList").append(str);
  },

  formLogicRemoveOption: function formLogicRemoveOption() {
    if (parseInt(this.props.pollOptionInc) > 1) {

      --this.props.pollOptionInc;
      $("#optionList input:last").remove();
      if (parseInt(this.props.pollOptionInc) === 1) {
        //  this.props.handleBtnDisable("true");
      }
    }
  },
  handleModalIngredients: function handleModalIngredients(arr) {
    if (arr.length > 0) {
      this.props.pollOptionInc = arr.length;
      var newIngredientsArr = arr.map(function (object, i) {
        return React.createElement(ModalIngredients, { singleIngredient: object.value });
      });
      return newIngredientsArr;
    } else {
      return React.createElement(ModalIngredients, null);
    }
  },

  render: function render() {
    var _this2 = this;

    var popover = React.createElement(
      Popover,
      { id: "modal-popover", title: "popover" },
      "very popover. such engagement"
    );
    var tooltip = React.createElement(
      Tooltip,
      { id: "modal-tooltip" },
      "wow."
    );

    return React.createElement(
      "div",
      null,
      React.createElement(
        Modal,
        { show: this.props.showModal, onHide: this.props.onHide },
        React.createElement(
          Modal.Header,
          { bsClass: "modal-header-primary", closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            React.createElement(
              "b",
              null,
              "Create your Recipe"
            )
          )
        ),
        React.createElement(
          Modal.Body,
          { bsClass: "body-modal-color" },
          React.createElement(
            "form",
            { className: "formsStyle", id: "createRecipe" },
            React.createElement(
              "div",
              { className: "form-group" },
              React.createElement(
                "label",
                { className: "control-label", "for": "title" },
                "Title:"
              ),
              React.createElement("input", { className: "form-control", value: this.props.title, onChange: function onChange(e) {
                  return _this2.props.updateValues(e.target.value, false, false);
                }, placeholder: "Please enter a title", name: "title", type: "text", required: true })
            ),
            React.createElement(
              "div",
              { className: "form-group" },
              React.createElement(
                "label",
                { className: "control-label", "for": "description" },
                "Instructions:"
              ),
              React.createElement("input", { onChange: function onChange(e) {
                  return _this2.props.updateValues(false, e.target.value, false);
                }, value: this.props.description, className: "form-control", placeholder: "Please enter some Instructions", name: "description", type: "text", required: true })
            ),
            React.createElement(
              "div",
              { className: "form-group" },
              React.createElement(
                "label",
                { className: "control-label", "for": "option" },
                "Enter at least one Ingredient:"
              ),
              React.createElement(
                "div",
                { id: "optionList", className: "list-group" },
                this.handleModalIngredients(this.props.ingredientsArray)
              )
            ),
            React.createElement(
              "div",
              { className: " row " },
              React.createElement(
                "div",
                { className: "col-md-6" },
                "  ",
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-block btn-primary", id: "moreOptions", onClick: this.formLogicAddOption },
                  "Add More Ingredients"
                )
              ),
              React.createElement(
                "div",
                { className: "col-md-6" },
                "  ",
                React.createElement(
                  "button",
                  { disabled: !this.props.btnDisabled, type: "button", className: "btn btn-block btn-warning", id: "remLastOption", onClick: this.formLogicRemoveOption },
                  "Remove Last Ingredient"
                )
              )
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          { bsClass: "modal-header-primary-bottom" },
          React.createElement(
            ButtonToolbar,
            null,
            React.createElement(
              Button,
              { onClick: this.onCreateRecipe, id: "submitRecipe", type: "submit", form: "createRecipe", bsStyle: "success" },
              "Save"
            ),
            React.createElement(
              Button,
              { onClick: this.props.onHide },
              "Close"
            )
          )
        )
      )
    );
  }
});

var Main = React.createClass({
  displayName: "Main",
  getInitialState: function getInitialState() {
    return {
      showModal: false,
      pollOptionInc: 1,
      btnDisabled: "true",
      recipesArr: this.fetchUserRecipes(),
      title: "",
      description: "",
      ingredientsArray: []
    };
  },
  handleRecipesArrUpdate: function handleRecipesArrUpdate(fn) {
    this.setState({
      recipesArr: fn()
    });
  },
  deleteUserRecipe: function deleteUserRecipe(title) {
    localStorage.removeItem(title);
  },
  fetchUserRecipes: function fetchUserRecipes() {
    var _this3 = this;

    var itemsArr = [];

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      itemsArr.push(JSON.parse(localStorage.getItem(key)));
    }
    ////RETURN AN ARRAY OF userRecipes USING .map();///

    var userRecipes = itemsArr.map(function (object, i) {
      var ingredientsArr = object.slice(2, object.length + 1);
      return React.createElement(ItemRecipe, {
        key: i + 1,
        myNum: i + 1,
        title: object[0].value,
        description: object[1].value,
        ingredientsArr: ingredientsArr,
        deleteUserRecipe: _this3.deleteUserRecipe,
        handleRecipesArrUpdate: _this3.handleRecipesArrUpdate,
        fetchUserRecipes: _this3.fetchUserRecipes,
        openToUpdate: _this3.openToUpdate

      });
    });
    return userRecipes;
  },
  handleBtnDisable: function handleBtnDisable(val) {
    this.setState({
      btnDisabled: val
    });
  },
  close: function close() {
    this.setState({
      showModal: false
    });
  },
  openToUpdate: function openToUpdate(title, description, ingredientsArray) {
    this.setState({
      showModal: true,
      title: title,
      description: description,
      ingredientsArray: ingredientsArray
    });
  },
  updateValues: function updateValues(title, description, ingredientsArray) {
    if (title !== false) {
      this.setState({
        title: title
      });
    }
    if (description !== false) {
      this.setState({
        description: description
      });
    }
    if (ingredientsArray !== false) {
      this.setState({
        ingredientsArray: ingredientsArray
      });
    }
    if (title !== false && description !== false && ingredientsArray !== false) {
      this.setState({
        title: "",
        description: "",
        ingredientsArray: []
      });
    }
  },
  open: function open() {
    this.setState({
      showModal: true,
      title: '',
      description: '',
      ingredientsArray: []
    });
  },

  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        { id: "presentationText" },
        "Recipe Book:"
      ),
      React.createElement(
        "div",
        { className: "well", id: "myContainerReact" },
        React.createElement(
          PanelGroup,
          { accordion: true },
          this.state.recipesArr
        )
      ),
      React.createElement(AddModal, { updateValues: this.updateValues, description: this.state.description, ingredientsArray: this.state.ingredientsArray, title: this.state.title, showModal: this.state.showModal, pollOptionInc: this.state.pollOptionInc, btnDisabled: this.state.btnDisabled, handleBtnDisable: this.handleBtnDisable, onHide: this.close, fetchUserRecipes: this.fetchUserRecipes, handleRecipesArrUpdate: this.handleRecipesArrUpdate }),
      React.createElement(
        "button",
        { className: "btn btn-success btn-large", id: "addReceipe", onClick: this.open },
        "Add a receipe"
      ),
      React.createElement(
        "footer",
        { className: "text-center" },
        React.createElement("hr", null),
        React.createElement(
          "p",
          null,
          "Written and Coded by ",
          React.createElement(
            "a",
            { href: "https://www.freecodecamp.com/michaelzap94", target: "_blank" },
            "Michael Zapata"
          ),
          "."
        )
      )
    );
  }
});
var ItemRecipe = React.createClass({
  displayName: "ItemRecipe",

  handleIngredients: function handleIngredients() {
    var newIngredientsArr = this.props.ingredientsArr.map(function (object, i) {
      return React.createElement(
        ListGroupItem,
        { bsStyle: "info" },
        object.value
      );
    });
    return newIngredientsArr;
  },
  render: function render() {
    var _this4 = this;

    return React.createElement(
      Panel,
      { header: this.props.title, bsStyle: "primary", eventKey: this.props.myNum, collapsible: true },
      React.createElement(
        "h4",
        { style: { margin: 0, padding: 0 } },
        React.createElement(
          "b",
          null,
          "Instructions:"
        ),
        " ",
        this.props.description
      ),
      React.createElement("hr", null),
      React.createElement(
        "h4",
        null,
        React.createElement(
          "b",
          null,
          "Ingredients:"
        ),
        " "
      ),
      React.createElement(
        ListGroup,
        null,
        this.handleIngredients()
      ),
      React.createElement(
        ButtonToolbar,
        null,
        React.createElement(
          Button,
          { onClick: function onClick() {
              _this4.props.deleteUserRecipe(_this4.props.title);_this4.props.handleRecipesArrUpdate(_this4.props.fetchUserRecipes);
            }, bsStyle: "danger" },
          "Delete"
        ),
        React.createElement(
          Button,
          { onClick: function onClick() {
              _this4.props.openToUpdate(_this4.props.title, _this4.props.description, _this4.props.ingredientsArr);
            }, bsStyle: "warning" },
          "Edit"
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Main, null), document.querySelector('#rootDiv'));