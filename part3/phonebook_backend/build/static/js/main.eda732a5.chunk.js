(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,n,t){},42:function(e,n,t){},43:function(e,n,t){},44:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t.n(r),o=t(16),a=t.n(o),i=(t(22),t(3)),s=t(17),u=t(5),l=t.n(u),d="api/persons",j=t(0),b=function(e){var n=e.persons,t=e.setPersons,r=e.newName,c=e.setNewName,o=e.newNumber,a=e.setNewNumber,i=e.setNewNotification,u=function(){return(e=r,n=o,l.a.post(d,{name:e,number:n}).then((function(e){return e.data}))).then((function(e){return i({message:"Added ".concat(e.name),type:"info"}),setTimeout((function(){i({})}),3e3),e})).catch((function(){return alert("Ha ocurrido un error al guardar el nuevo contacto"),Promise.reject(new Error("Ha ocurrido un error al guardar el nuevo contacto"))}));var e,n},b=function(e){e.number=o,function(e){return l.a.put("".concat(d,"/").concat(e.id),e).then((function(e){return e.data}))}(e).then((function(){i({message:"Updated ".concat(r),type:"info"}),setTimeout((function(){i({})}),3e3)})).catch((function(){i({message:"Information of ".concat(r," has already been removed from server"),type:"error"}),setTimeout((function(){i({})}),3e3)}))};return Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault();var o=n.find((function(e){return e.name===r}));void 0===o?u().then((function(e){return t([].concat(Object(s.a)(n),[e]))})).catch((function(e){return console.log(e)})):window.confirm("".concat(o.name," is already added to phonebook, replace the old number with a new one?"))&&b(o);c(""),a("")},children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{children:"name: "}),Object(j.jsx)("input",{onChange:function(e){c(e.target.value)},value:r})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{children:"number: "}),Object(j.jsx)("input",{onChange:function(e){a(e.target.value)},value:o})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{type:"submit",children:"add"})})]})},f=function(e){var n=e.persons,t=e.filter,r=e.setPersons,c=function(e){var t=e.name,c=e.id;if(window.confirm("Delete ".concat(t,"?"))){var o=n.filter((function(e){return e.id!==c}));r(o),function(e){return l.a.delete("".concat(d,"/").concat(e))}(c).then((function(){return console.log("Contacto borrado correctamente")})).catch((function(){return console.error("Error al borrar el contacto")}))}};return n.filter((function(e){return""===t||e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(j.jsxs)("div",{children:[e.name," ",e.number,Object(j.jsx)("button",{onClick:function(){return c(e)},children:"Delete"})]},e.id)}))},h=function(e){var n=e.newFilter,t=e.setNewFilter;return Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{children:"Filter shown with"}),Object(j.jsx)("input",{onChange:function(e){t(e.target.value)},value:n})]})},m=(t(42),function(e){var n=e.message,t="notification ".concat(n.type);return void 0===n.message?null:Object(j.jsx)("div",{className:t,children:n.message})}),O=(t(43),function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(""),a=Object(i.a)(o,2),s=a[0],u=a[1],O=Object(r.useState)(""),v=Object(i.a)(O,2),p=v[0],w=v[1],x=Object(r.useState)(""),N=Object(i.a)(x,2),g=N[0],y=N[1],k=Object(r.useState)({}),C=Object(i.a)(k,2),S=C[0],E=C[1];return Object(r.useEffect)((function(){l.a.get(d).then((function(e){return e.data})).then((function(e){return c(e)})).catch((function(e){return console.error("Error en el GET:",e)}))}),[]),Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("h2",{children:"Phonebook"}),Object(j.jsx)(m,{message:S}),Object(j.jsx)(h,{newFilter:g,setNewFilter:y}),Object(j.jsx)("h2",{children:"Add a new"}),Object(j.jsx)(b,{persons:t,setPersons:c,newName:s,setNewName:u,newNumber:p,setNewNumber:w,setNewNotification:E}),Object(j.jsx)("h2",{children:"Numbers"}),Object(j.jsx)(f,{persons:t,filter:g,setPersons:c})]})});a.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(O,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.eda732a5.chunk.js.map