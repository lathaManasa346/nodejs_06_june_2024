const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app")
const employeeModel = require('../src/models/employee_model')
chai.use(chaiHttp);
const { expect } = chai;

describe("This is test suite for employee controller", () => {
    let findStub;
    let findOneStub;

    beforeEach(() => {
        findStub = sinon.stub(employeeModel, 'find');
        findOneStub = sinon.stub(employeeModel, 'findOne');
    })
    afterEach(() => {
        findStub.restore();
        findOneStub.restore();
    })

    it("It should return all the employees", async () => {
        const mockEmployees = [
            { _id: '111', name: 'sanjay samantra' },
            { _id: '222', name: 'praveen Kumar' },
        ];
        findStub.resolves(mockEmployees);
        const res = await chai.request(app).get('/employees');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(mockEmployees);
    })
    it("It should return 1 employee", async () => {
        const mockEmployee = { _id: '111', name: 'sanjay samantra' }
        findOneStub.resolves(mockEmployee);

        const res = await chai.request(app).get('/employees/111');
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(mockEmployee);
    })
    it("It should return 204 when employee is not found", async () => {
        findOneStub.resolves(null);
        const res = await chai.request(app).get('/employees/333');
        expect(res).to.have.status(404);
        expect(res.text).to.equal('employee not found')
    })
    it("It should return 500 if there is server error", async () => {
        findOneStub.rejects(new Error('Server error'));
        const res = await chai.request(app).get('/employees/333');
        expect(res).to.have.status(500);
        expect(res.text).to.equal('Server error')
    })
})