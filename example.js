$(document).ready(function() {


  // Backbone.ModalView Example 1
  // Basic modal dialog
  $("#btn-1").click(function(e) {
    var modal = new Backbone.ModalView({
      body: "Hello World!"
    });
    modal.render();
  });

  // Backbone.ModalView Example 2
  // Modal dialog with custom buttons, events and postRender function
  var MyModal = Backbone.ModalView.extend({
    title: "<h3>Modal with custom buttons</h3>",
    buttons: [{
      className: "btn-primary ok",
      label: "Ok"
    }, {
      className: "btn-default cancel",
      label: "Cancel",
      close: true
    }],
    events: {
      "click .modal-footer a.ok": "onOk",
      "click .modal-footer a.cancel": "onCancel",
      "hidden.bs.modal": "onHidden"
    },
    postRender: function() {
      var $h4 = $("<h4>").text("Events"),
          $p = $("<p>").text("Use Backbone.View <code>events</code> to bind buttons. Click on the buttons and look at the console.")
      this.$body.append($h4).append($p);
      return this;
    },
    onOk: function(e) {
      e.preventDefault();
      console.log("Ok clicked");
    },
    onCancel: function(e) {
      console.log("Cancel clicked");
    },
    onHidden: function(e) {
      console.log("Modal hidden");
    }
  });
  $("#btn-2").click(function(e) {
    new MyModal().render();
  });
  

  // BackBone.FormView Example
  // Person with nested address
  var person = {
    id: 101,
    firstName: "Andre",
    lastName: "Jones",
    address: {
      address1: "1751 rue Richardson",
      address2: "Suite 3.105",
      city: "Montréal",
      postalCode: "H3K 1G6",
      province: "QC"
    }
  };
  var person = new Backbone.Model(person);
  var form = new Backbone.FormView({
    el: "#form",
    model: person,
    schema: [
    {name: "id", label: "Id", control: "uneditableInput"},
    {name: "firstName", label: "First Name", control: "input"},
    {name: "lastName", label: "Last Name", control: "input"},
    {control: "spacer"},
    {name: "address", nested: "address1", label: "Address1", control: "input"},
    {name: "address", nested: "address2", label: "Address2", control: "input"},
    {name: "address", nested: "city", label: "City", control: "input"},
    {name: "address", nested: "postalCode", label: "Postal Code", control: "input"},
    {
      name: "address",
      nested: "province",
      label: "Province",
      control: "select",
      options: [
        {label: "Alberta", value: "AB"},
        {label: "British Columbia", value: "BC"},
        {label: "Manitoba", value: "MB"},
        {label: "New Brunswick", value: "NB"},
        {label: "Newfoundland and Labrador", value: "NL"},
        {label: "Northwest Territories", value: "NT"},
        {label: "Nova Scotia", value: "NS"},
        {label: "Nunavut", value: "NU"},
        {label: "Ontario", value: "ON"},
        {label: "Prince Edward Island", value: "PE"},
        {label: "Québec", value: "QC"},
        {label: "Saskatchewan", value: "SK"},
        {label: "Yukon", value: "YT"}
      ]
    }]
  });
  form.render();

  function updateObject() {
    $("#object").text(JSON.stringify(person.toJSON(), null, 2));
  }
  person.on("change", updateObject);
  updateObject();

});