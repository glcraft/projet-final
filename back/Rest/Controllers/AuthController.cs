﻿using Microsoft.IdentityModel.Tokens;
using Rest.DAL;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using static Rest.Models.AccountBindingsModel;

namespace Rest.Controllers
{
    [EnableCors("*", "*", "*")]
    public class AuthController : ApiController
    {
        [HttpPost]
        [Route("api/auth/login")]
        public IHttpActionResult Login([FromBody] LoginBindingModel login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Invalid client request");
            }

            // Recherche du client dans la base de données
            //var client = new ProjetFinalEntities().Clients.FirstOrDefault(c => c.email == login.Email && c.passwd == login.Password);
            var client = new ProjetFinalEntities().Clients.FirstOrDefault(c => c.email == login.Email);

            if (client == null || !client.VerifPassword(login.Password))
            {
                return Unauthorized();
            }

            // Génération du token
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("aP$3jKl1B9sZ8o5W2vG!7xD6yN@mQ4Rt"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:61306", // Remplacer par votre domaine
                audience: "https://localhost:61306", // Remplacer par votre domaine
                claims: new List<Claim>
                {
                    new Claim(ClaimTypes.Name, client.email),
                    new Claim("ClientId", client.id.ToString())
                },
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            var clientThrow = new ClientThrow
            {
                Id = client.id,
                Nom = client.nom,
                Email = client.email,
                Adr_ligne1 = client.adr_ligne1,
                Adr_ligne2 = client.adr_ligne2,
                Adr_cp = client.adr_cp,
                Adr_ville = client.adr_ville
            };

            return Ok(new { Token = tokenString, Client = clientThrow });
        }
    }
}