      //PREGUNTAS Y RESPUESTAS
      var palabras=[
        [ //nivel 0
          {respuesta: "Riu Jalisco" , pregunta:"Hotel Ubicado en Puerto Vallarta del Grupo Hotelero Riu"},
          {respuesta: "las Hadas" ,  pregunta:"Hotel Ubicado en Puerto Manzanillo del grupo hd"},
          {respuesta: "marival residences" ,  pregunta:"Hotel Ubicado en Puerto Vallarta del grupo marival"},
          {respuesta: "Oro" ,  pregunta:"metal mas valioso de la tierra"}
        ],
        [ //nivel 1
          {respuesta: "Moon Palace Cancun" , pregunta:"Hotel Deluxe de cancùn"},
          {respuesta: "Grand Oasis Palm" ,  pregunta:"Hotel 5 estrellas  de cancùn"},
          {respuesta: "costa alegre" ,  pregunta:"Hotel 4 estrellas de guayabitos"}
        ],
        [ //nivel 2
          {respuesta: "8" , pregunta:"cuantas Sucursales tiene Imacop"},
          {respuesta: "imacoptour.com" ,  pregunta:"cual es la pagina oficial de Imacop"},
          {respuesta: "guiainteractivadehoteles.com" ,  pregunta:"Pagina de imacop para vizualizar Hoteles y sus descripciones ,habitaciones, entre otras"}
        ]
      ];

      //console.log(palabras);

      //CUMPLE LA FINALIDAD DE SELECCIONAR UNA PREGUNTA DENTRO DEL ARRAY NIVEL SELECCIONADO
      function establecer_nivel(nivel){
        //Segun el Nivel De Dificultad Generar Pregunta?
        //saber cuantas preguntas hay
        var num_preguntas_del_nivel=palabras[(nivel-1)].length;

        //generar un numero aleatorio de 0 hasta el numero de preguntas qeu contiene el array del nivel
        var pos_seleccionada=Math.floor(Math.random() * num_preguntas_del_nivel) //ejemplo del 0-2 es *3;

        //guardar la pregunta seleccionada y la rerspuesta
        var pregunta_bus=palabras[(nivel-1)][pos_seleccionada].pregunta;
        var respuesta_bus=palabras[(nivel-1)][pos_seleccionada].respuesta;

        localStorage.setItem('pregunta_bus_ahorcado',pregunta_bus);
        localStorage.setItem('respuesta_bus_ahorcado',respuesta_bus);
      }



      //INICIAR EL JUEGO ----------------------------------------------------------------------------------------------
       var btn_presion=document.querySelector("#btn_empezar");
       btn_presion.addEventListener('click', function(){
             //si esta activo el local storage empezar variables locales
             if(typeof(Storage)!=="undefined")
             {
               if(localStorage.getItem("nivel_ahorcado"))
               { //crear campos
                 crear_ecenario();
               }
               else
               {
                  $("#btn_empezar").show();
                  //se declaran e inizializan las variables locales en nivel (1)
                  localStorage.setItem('nivel_ahorcado',1);
                  localStorage.setItem('oportunidades_ahorcado',5);
                  localStorage.setItem('marcador_ahorcado',[{nivel:1,encontradas:0,equivocadas:0}]);//crear variable marcador

                  console.log(localStorage.getItem("nivel_ahorcado"));

                  var nivel_actual=localStorage.getItem("nivel_ahorcado");
                  establecer_nivel(nivel_actual);

                  crear_ecenario();//proseguir el juego
               }
             }//se puede usar localstorage
       });
       //INICIAR EL JUEGO ----------------------------------------------------------------------------------------------





       //si el juego esta comenzado con el nivel guardado y la palabra continuar
       //CONTINUAR EL JUEGO DONDE SE QUEDO
       if(localStorage.getItem("nivel_ahorcado") && localStorage.getItem("pregunta_bus_ahorcado"))
       {
         verificar_estado_juego();
       }






       //FUNCION PARA CONTINUAR EL JUEGO APARTIR DE TU ULTIMO PUNTO DE CONTROL-----------------------------------------
       function crear_ecenario()
       {

         $("#btn_empezar").hide();
         $("#div_palabra").empty();
         console.log('CONTINUANDO..');
         console.log('nivel_ahorcado',localStorage.getItem("nivel_ahorcado"));
         console.log('pregunta_bus_ahorcado=>',localStorage.getItem("pregunta_bus_ahorcado"));
         console.log('respuesta_bus_ahorcado=>',localStorage.getItem("respuesta_bus_ahorcado"));

           //Generar Diviciones
           var num_letras=localStorage.getItem("respuesta_bus_ahorcado").length;

            var nivel_actual=localStorage.getItem("nivel_ahorcado");
            var respuesta=localStorage.getItem("respuesta_bus_ahorcado").toUpperCase() || "" ;
            var pregunta=localStorage.getItem("pregunta_bus_ahorcado").toUpperCase() || "" ;
            var oportunidades=localStorage.getItem("oportunidades_ahorcado") || 5 ;
            var atinadas=localStorage.getItem("atinadas_ahorcado") || 0 ;

            //Mostrar Oportunidades Restantes
            document.querySelector("#txt_oportunidades").innerHTML=oportunidades+" ";


            //VERIFICAR SI LA CONSOLA DE VIDEO JUEGO NO TIENE ELEMENTOS CREADOS CREARLOS
              console.log('HTML=',document.getElementById('div_palabra').innerHTML);
              if(document.getElementById('div_palabra').innerHTML) {
                console.log('Yes content');
              }
              else
              {
                //DIV VACIO
                $("#div_palabra").append(`
                   <h2>Lvl `+nivel_actual+`</h2>
                   `+pregunta+`?
                   <br>
                `);


                var letras=[]
                for(var i=0;i<num_letras;i++)
                {
                  letras[i]=respuesta[i];

                    //generar inputs
                    $("#div_palabra").append(`
                       <input class='campo' readonly type='text' id='put_`+i+`' value='' >
                   `);
                }
              }//CREANDO ELEMENTOS


       }
       //------------------continue---game-----------------------------------------






        //PRESION DE TECLAS E IDENTIFICADOR DE LETRAS  //KEYUP //Presion de Tecla
        var btn_presion=document.querySelector("#teclas_game");
        btn_presion.addEventListener('keyup', function(event){
          //convierte el char code a su version => String String.fromCharCode()
          var letra_presionada=String.fromCharCode(event.keyCode);
          console.log('presionaste la tecla  '+letra_presionada);
          console.log(event.keyCode);


          //si esta comezado el Juego
          if(localStorage.getItem("nivel_ahorcado"))
          {

              //Obtener variables Principales
              var nivel_actual=localStorage.getItem("nivel_ahorcado");
              var respuesta=localStorage.getItem("respuesta_bus_ahorcado").toUpperCase() || "" ;
              var pregunta=localStorage.getItem("pregunta_bus_ahorcado").toUpperCase() || "" ;
              var oportunidades=localStorage.getItem("oportunidades_ahorcado") || 5 ;
              var atinadas=localStorage.getItem("atinadas_ahorcado") || 0 ;

              //solo si tiene Oportunidades Activas
              if(oportunidades>0)
              {
                      //verificar si se encuentra la letra dentro de la palabra a encontrar
                      var num_letras=respuesta.length;
                      var errores_acumulados=0;

                      //RECORRER PALABRA
                      for(var i=0;i<num_letras;i++)
                      {
                        //pulsaste una tecla correcta
                        if(letra_presionada==respuesta[i]){

                          //solo valida si el input es vacio //cuenta atinados real
                          if($('#put_'+i).val().length==0)
                          {
                            $('#put_'+i).val(letra_presionada);
                            atinadas++;//sumar
                            localStorage.setItem('atinadas_ahorcado',atinadas);
                            document.querySelector("#txt_encontradas").innerHTML=atinadas+" ";
                          }
                        }
                        else{
                          errores_acumulados++; //acumular errores para verificar si no se econtro en la cadena
                        }
                      }

                    //si errores_acumulados es igual al tamaño de la palabra no se econtro ningun caracter perder una vida
                    //RESTAR OPORTUNIDADES
                    if(errores_acumulados==num_letras){
                      //restar una oportunidad
                      oportunidades--;
                      //Mostrar Oportunidades Restantes
                      localStorage.setItem('oportunidades_ahorcado',oportunidades);
                      document.querySelector("#txt_oportunidades").innerHTML=oportunidades+" ";
                      //verificar si no a perdido la Partida
                      verificar_estado_juego();
                    }

                    //SI SE COMPLETA LA PALABRA CORRECTAMENTE
                    if(atinadas==num_letras){
                      subir_nivel();//completaste la palabra subir el nivel
                    }
              }

          }//si existen las sessiones
        });
        //PRESION DE TECLAS E IDENTIFICADOR DE LETRAS


        //VERIFICA SI SE A PERDIDO O AVANZADO DE NIVEL
        function verificar_estado_juego()
        { //SOLO SI ESTA ACTIVO EL JUEGO
          if(localStorage.getItem("nivel_ahorcado"))
          {
            var respuesta=localStorage.getItem("respuesta_bus_ahorcado").toUpperCase();
            var num_letras=respuesta.length;
            var oportunidades=localStorage.getItem("oportunidades_ahorcado");
            var atinadas=localStorage.getItem("atinadas_ahorcado");

            if(oportunidades<=0){
              $("#btn_empezar").hide();
              gameover();
            }
          }
        }



       //REINICIAR JUEGO Y MARCADORES
       var btn_presion=document.querySelector("#btn_reiniciar");
        btn_presion.addEventListener('click', function()
        {
          $("#btn_empezar").show();
          $("#div_palabra").empty();
          //si existen las variables reiniciarlas
          if(localStorage.getItem("nivel_ahorcado")){
            localStorage.removeItem('nivel_ahorcado');
            localStorage.removeItem('pregunta_bus_ahorcado');
            localStorage.removeItem('respuesta_bus_ahorcado');
            localStorage.removeItem('oportunidades_ahorcado');
            localStorage.removeItem('atinadas_ahorcado');

            document.querySelector("#txt_oportunidades").innerHTML=5+" ";
            document.querySelector("#txt_encontradas").innerHTML=0+" ";
          }
        });



       //SUBIR EL NIVEL DE DIFICULTAD
       function subir_nivel()
       {
         if(localStorage.getItem("nivel_ahorcado"))
         {
           var nivel_actual=localStorage.getItem("nivel_ahorcado");
           localStorage.setItem('atinadas_ahorcado',0);//reiniciar los atinados
           document.querySelector("#txt_encontradas").innerHTML=0+" ";

           nivel_actual++;
           localStorage.setItem('nivel_ahorcado',nivel_actual);
           establecer_nivel(nivel_actual);
           alert('Felicidades pasas al Nivel ');
           crear_ecenario();//Continuar el Siguiente Nivel
         }
       }




        //GAME   OVER
       function gameover()
       {
         console.log('GAME OVER');
         var nivel_actual=localStorage.getItem("nivel_ahorcado");

         //alert('Perdiste');
         $("#div_palabra").empty();
         $("#div_palabra").append(`
            <span class='game_over' >GAME OVER </span>
            <br>
            --- Tu Marcador --
            <br>
            <p class='tabla_de_marcador'>
              llegaste al Nivel <span class='info_resultado'> `+nivel_actual+`</span>
            </p>
        `);
       }
