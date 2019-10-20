const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);
let token;
describe('api/movies tests',()=>{
    before((done)=>{
        chai.request(server)
        .post('/authenticate')
        .send({username:'Kerem',password:'12345'})
        .end((err,res)=>{
           // res.should.have.status(200);
            token=res.body.token;
           // console.log(token);
            done();
        })
    });
    describe('/GET movies',()=>{
        it('it should GET all the movies', (done)=>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    });
    describe('/POST movie', ()=>{
        it('it should POST a movie',(done)=>{
            
        });
    })
}); 