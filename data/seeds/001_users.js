/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("users").insert([
    {
      username: "admin",
      email: "admin@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "admin",
      active: true,
    },
    {
      username: "janedoe",
      email: "janedoe@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
    {
      username: "bobsmith",
      email: "bobsmith@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: false,
    },
    {
      username: "alicegreen",
      email: "alicegreen@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
    {
      username: "charliemiller",
      email: "charliemiller@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
    {
      username: "emmawatson",
      email: "emmawatson@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
    {
      username: "bradpitt",
      email: "bradpitt@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
    {
      username: "angelinajolie",
      email: "angelinajolie@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
    {
      username: "leonardodicaprio",
      email: "leonardodicaprio@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
    {
      username: "katyperry",
      email: "katyperry@example.com",
      password: "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm", // "pass1234"
      role: "user",
      active: true,
    },
  ]);
};
