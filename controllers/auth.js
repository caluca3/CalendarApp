const {response} = require('express');  //*Usa la libreria ya cargada para poder una el intelisense
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT} = require( '../helpers/jason-web-token')

const crearUsuario = async(req, res= response)=>{

    const {email,password} = req.body;
    try {
        let usuario = await Usuario.findOne({email})
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'Corrreo existente'
            })
        }
        //const usuario = new Usuario(req.body);
        //await usuario.save();
        usuario = new Usuario(req.body);
        
        //*Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt); 


        await usuario.save();
        //*Generar JASON-WEB-TOKEN
        const token = await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        });    
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte base de datos'
        });
    }
       
}

const loginUsuario = async(req,res =response)=>{
    
    const {email,password} = req.body;
    
    try{ 
      const usuario = await Usuario.findOne({email})
      if (!usuario) {
          return res.status(400).json({
              ok:false,
              msg:'El usuario no existe con ese Email'
          });
      }

      //*Confirmar las passwords 
    const validPassword = bcrypt.compareSync(password,usuario.password);
        if (!validPassword) {
           return res.status(400).json({
                ok:false,
                msg:'Password no valido'
           });
        }

        //*Generar nuestro JASON-WEB-TOKEN
        const token = await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte base al administrador'
        });
    }
}

const revalidarUsuario= async(req,res = response)=>{

    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo JWT y retornarlo en la peticion
    const token = await generarJWT(uid,name);
    res.json({
        ok:true,
        uid,
        name,
        token
    });
}

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarUsuario,
}

//*0283-2354093 