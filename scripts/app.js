const TodosApp = {
    data() {
      return {
        todos:[],
        enteredTodoText: '',
        editedTodoId: null
      };
    },
    methods: {
        saveTodo(event) {    //name savetodo up tto us same with newtodo
            event.preventDefault();

            if(this.editedTodoId) {
              const todoId = this.editedTodoId;   //the (this) is created here
              const todoIndex = this.todos.findIndex(function(todoItem) {
                return todoItem.id === todoId;  //view will not be able to remap an inside  (this)
              });
              const updatedTodoItem = {
                id: this.todos[todoIndex].id,
                text: this.enteredTodoText
              };

              this.todos[todoIndex] = updatedTodoItem;
              this.editedTodoId = null;
              //updating....
            } else {
              //creating
              const newTodo = {
                text: this.enteredTodoText,
                id: new Date().toISOString()
              };
    this.todos.push(newTodo);
            }
          

          this.enteredTodoText = '';
        },
        startEditTodo(todoId) {
          this.editedTodoId = todoId;
          const todo = this.todos.find(function(todoItem) {
            return todoItem.id === todoId;
          });
          this.enteredTodoText = todo.text;
        },
        deleteTodo(todoId) {
          this.todos = this.todos.filter(function(todoItem) {
            return todoItem.id !== todoId;
          });
        }
        
    }
  };
  
  Vue.createApp(TodosApp).mount('#todos-app');