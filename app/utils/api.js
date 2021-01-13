const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');
const io = require('socket.io-client');

const socket = io('http://localhost:3030');
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));

app.configure(
  auth({
    storage: window.localStorage,
  }),
);
// app.on('disconnect', (reason) => {
// alert("You are Offline")
//   // Show offline message
// });
// export const art_service = app.service('art-listing');
// export const ups = app.service('uploads');

export const users = app.service('users');
export const agencies = app.service('agents');
export const buildings = app.service('buildings');
export const units = app.service('rooms');
export const agency_admins = app.service('agency-admins');
export const building_admins = app.service('building-admins');
export const user_profile = app.service('profile');
export const tenants = app.service('tenants');
export const chats = app.service('chats');
// building notices
export const notices = app.service('notices');
export const requests = app.service('requests');
export const teams = app.service('teams');
export const profiles = app.service('profile');
export const authManagement = app.service('authManagement');
export const mass_sms = app.service('mass-sms');
export const mass_emails = app.service('mass-emails');
export const agency_notices = app.service('agency-notices');
export const smsS = app.service('single-sms');
export const emails = app.service('single-emails');
export const contacts = app.service('contacts');
export const inventory = app.service('inventory');
export const building_mass_sms = app.service('building-mass-sms');
export const building_mass_emails = app.service('building-mass-emails');
export const chat_rooms = app.service('chat-rooms');
export const special_notice = app.service('special-notices');
export const payments = app.service('payment-info');
export const transactions = app.service('transactions');
export const receipts = app.service('receipts');
export const add_requests = app.service('add-requests');

export default app;
