const contacts = [
  {
    _id: '10423455265ddc184c7cb899',
    subscription: 'free',
    name: 'Polina',
    email: 'poly@gmail.com',
    phone: '0118221084',
    owner: '604160bf244710506826c5bd',
  },
  {
    _id: '1242346b265ddc184c7cb333',
    subscription: 'pro',
    name: 'Test15',
    email: 'Test15@gmail.com',
    phone: '1111581569',
    owner: '604160bf244710506826c5bd',
  },
];

const newContact = {
  name: 'Pion',
  email: 'Pion@gmail.com',
  phone: '11295816422',
  subscription: 'pro',
};

const User = {
  _id: '134160bf244710501226c5bc',
  subscription: 'pro',
  token:
    'eyJhb11iOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjYwNDE215JmijQ0NzEwNTA2ODI2YzViYyIsImlhdCI6MTYxNTU0Mjg3MywiZXhwIjoxNjE1NTUwMDczfQ._3Q9Q9eoRIPn40B6ha-_Eybvp9GvZb1muv3BPiGStf4',
  email: 'testing@example.com',
  password: '$bb$08$okH1276YlenyP1aDx3eJkuE6NoiQNWSXs67Mul0RQr1lrAR9u4pMy',
  avatarURL: '134160bf244710506826c5bc\\1615557622855-test.png',
};

const users = [];
users[0] = User;

const newUser = { email: 'test88@test.com', password: '1234567' };

module.exports = { User, users, newUser, contacts, newContact };