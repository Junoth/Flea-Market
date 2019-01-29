const chai = require('chai');
const express = require('../server');
const request = require('supertest')(express); 
const User = require('../model/Users');
const should = chai.should();

const defaultUser = {
  name: 'tester',
  email: 'test@test.com',
  password: '123456',
  password2: '123456',
  avatar: 'https://s3.amazonaws.com/fleamarket-avatar/default.png'
}

const cleanTestUser = async () => {
  await User.deleteMany({
    name: 'tester'
  });
}

const insertTestUser = async () => {
  await new User(defaultUser).save();
}

// api for test 
describe('Test api', () => {
  it('should pass the test api', () => {
    return request
      .get('/api/users/test')
      .expect(200)
      .then(res => {
        res.body.msg.should.equal("Users works")
      });
  });
});

// test register with empty information
describe('Test register with no info', () => {
  it('should return error info', () => {
    return cleanTestUser().then(res => {
      return request
        .post('/api/users/register')
        .expect(400)
        .then(res => {
          res.body.name.should.equal('Name Field is required'),
          res.body.email.should.equal('Email Field is required'),
          res.body.password.should.equal('Password Field is required'),
          res.body.password2.should.equal('Confirm Password field is required')
        });
    });
  });
});

const tooShortNameUser = {
  name: 'a',
  email: 'test@test.com',
  password: '123456',
  password2: '123456',
  avatar: 'https://s3.amazonaws.com/fleamarket-avatar/default.png'
}

// test register with too short name
describe('Test register with too short name', () => {
  it('should return error info', () => {
    return cleanTestUser().then(res => {
      return request
        .post('/api/users/register')
        .send(tooShortNameUser)
        .expect(400)
        .then(res => {
          res.body.name.should.equal('Name must be between 2 and 30 characters'),
          should.not.exist(res.body.email);
          should.not.exist(res.body.password);
          should.not.exist(res.body.password2);
        })
    })
  })
})

const wrongEmailUser = {
  name: 'tester',
  email: 'test@',
  password: '123456',
  password2: '123456',
  avatar: 'https://s3.amazonaws.com/fleamarket-avatar/default.png'
}

// test register with wrong email
describe('Test register with wrong email', () => {
  it('should return error info', () => {
    return cleanTestUser().then(res => {
      return request
        .post('/api/users/register')
        .send(wrongEmailUser)
        .expect(400)
        .then(res => {
          res.body.email.should.equal('Email is invalid'),
          should.not.exist(res.body.name),
          should.not.exist(res.body.password),
          should.not.exist(res.body.password2)
        })
    })
  })
})

const tooShortPasswordUser = {
  name: 'tester',
  email: 'test@test.com',
  password: '123',
  password2: '123',
  avatar: 'https://s3.amazonaws.com/fleamarket-avatar/default.png'
}

// test register with wrong name
describe('Test register with too short password', () => {
  it('should return error info', () => {
    return cleanTestUser().then(res => {
      return request
        .post('/api/users/register')
        .send(tooShortPasswordUser)
        .expect(400)
        .then(res => {
          res.body.password.should.equal('Password must be bewtween 6 and 30 characters'),
          should.not.exist(res.body.name);
          should.not.exist(res.body.email);
          should.not.exist(res.body.password2);
        })
    })
  })
})

const passwordNotMatchUser = {
  name: 'tester',
  email: 'test@test.com',
  password: '123456',
  password2: '1234567',
  avatar: 'https://s3.amazonaws.com/fleamarket-avatar/default.png'
}

// test register with not match password
describe('Test register with not match password', () => {
  it('should return error info', () => {
    return cleanTestUser().then(res => {
      return request
        .post('/api/users/register')
        .send(passwordNotMatchUser)
        .expect(400)
        .then(res => {
          res.body.password2.should.equal('Passwords must match'),
          should.not.exist(res.body.name),
          should.not.exist(res.body.email),
          should.not.exist(res.body.password)
        })
    })
  })
})

// test register with already exist email
describe('Test register with not match password', () => {
  it('should return error info', () => {
    return cleanTestUser().then(res => {
      return insertTestUser().then(res => {
        return request
          .post('/api/users/register')
          .send(defaultUser)
          .expect(403)
          .then(res => {
            res.body.email.should.equal('Email already exists'),
            should.not.exist(res.body.name),
            should.not.exist(res.body.password),
            should.not.exist(res.body.password2)
          })
        })
      })
  })
})

// test register with right information
describe('Test register success', () => {
  it('should register the new user', () => {
    return cleanTestUser().then(res => {
      return request
        .post('/api/users/register')
        .send(defaultUser)
        .expect(201)
        .then(res => {
          res.body.name.should.equal('tester'),
          res.body.email.should.equal('test@test.com'),
          res.body.avatar.should.equal('https://s3.amazonaws.com/fleamarket-avatar/default.png')
        });
    });
  })
})

// test login with empty info
describe('Test login with no info', () => {
  it('should return error info', () => {
    return request
      .post('/api/users/login')
      .expect(400)
      .then(res => {
        res.body.email.should.equal('Email Field is required'),
        res.body.password.should.equal('Password Field is required')
      });
  });
});

const wrongEmailFormat = {
  email: 'wrong@',
  password: '123456'
}

// test login with wrong email format
describe('Test login with wrong email format', () => {
  it('should return error info', () => {
    return request
      .post('/api/users/login')
      .send(wrongEmailFormat)
      .expect(400)
      .then(res => {
        res.body.email.should.equal('Email is invalid')
        should.not.exist(res.body.password)
      });
  });
})

const wrongEmailAccount = {
  email: 'new@new.com',
  password: '123456'
}

// test login with wrong email
describe('Test login with wrong email', () => {
  it('should return error info', () => {
    return request
      .post('/api/users/login')
      .send(wrongEmailAccount)
      .expect(404)
      .then(res => {
        res.body.email.should.equal('User not found')
        should.not.exist(res.body.password)
      });
  });
})

const wrongPasswordAccount = {
  email: 'test@test.com',
  password: '12345'
}

// test login with wrong password
describe('Test login with wrong password', () => {
  it('should return error info', () => {
    return cleanTestUser().then(res => {
      return insertTestUser().then(res => {
        return request
          .post('/api/users/login')
          .send(wrongPasswordAccount)
          .expect(400)
          .then(res => {
            res.body.password.should.equal('Password incorrect'),
            should.not.exist(res.body.email)
          })
        })
      })
  })
})

