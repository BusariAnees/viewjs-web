const TodosApp = {
    data() {
      return {
        isloading: false,
        todos:[],
        enteredTodoText: '',
        editedTodoId: null
      };
    },
    methods: {
       async  saveTodo(event) {    //name savetodo up tto us same with newtodo
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

              let response;

              try {
                response = await fetch('http://localhost:3000/todos/' + todoId, {
                  method: 'PATCH',
                  body: JSON.stringify({
                    newText: this.enteredTodoText,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              } catch (error) {
                alert('Something went wrong!');
                return;
              }
            
              if (!response.ok) {
                alert('Something went wrong!');
                return;
              }
             
              //updating....
            } else {
              //creating
              
              let response;

              try {
                response = await fetch('http://localhost:3000/todos', {
                  method: 'POST',
                  body: JSON.stringify({
                    text: this.enteredTodoText,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              } catch (error) {
                alert('Something went wrong!');
                return;
              }
            
              if (!response.ok) {
                alert('Something went wrong!');
                return;
              }
            
              const responseData = await response.json();
              const newTodo = {
                text: this.enteredTodoText,
                id: responseData.createdTodo.id,
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
       async deleteTodo(todoId) {

          this.todos = this.todos.filter(function(todoItem) {
            return todoItem.id !== todoId;
          });
          let response;

          try {
            response = await fetch('http://localhost:3000/todos/' + todoId, {
              method: 'DELETE',
            });
          } catch (error) {
            alert('Something went wrong');
            return;
          }
        
          if (!response.ok) {
            alert('Something went wrong!');
            return;
          }
        
          todoElement.remove();
        }

      
        },
        
       async  created() {
          let response;
          this.isloading = true;
          try {
            response = await fetch('http://localhost:3000/todos');
          } catch (error) {
            alert('Something went wrong!');
            return;
          }
        
          if (!response.ok) {
            alert('Something went wrong!');
            this.isloading = false;
            return;
          }

          this.isloading = false;
        
          const responseData = await response.json();
          this.todos = responseData.todos;
        }
  };
  
  Vue.createApp(TodosApp).mount('#todos-app');