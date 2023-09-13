const {isAdminUser, getApprovedUserAcls} = require("../services/user-auth");
describe('File Service Test', () => {

    test('/file acl array & user acl array compare test', () => {
        const test = [
            {session: {}, result: false},
            {session: {userStatus: 'active', role:'admin'}, result: true},
            {session: {userStatus: 'active'}, result: false},
            {session: {userStatus: 'aaaaa', role:'admin'}, result: false},
            {session: {userStatus: 'active', role:'ADMIN'}, result: true},
            {session: {userStatus: 'inActIve', role:'ADMIN'}, result: false},
            {session: {userStatus: 'actIve', role:'ADMIN'}, result: true},
            {session: {userStatus: null, role: null}, result: false},
        ];

        for (let t of test) {
            const result = isAdminUser(t.session);
            expect(result).toBe(t.result);
        }
    });

    test('/file approved user acls', () => {
        const test = [
            // {session: {}, result: false},
            {session: [{accessStatus: 'Approved', armID:'abcd'}], result: ['abcd']},
            {session: [{accessStatus: 'Approved', armID:''}], result: []},
            {session: [{}], result: []},
            {session: [{accessStatus: 'Approved', armID: undefined}], result: []},
            {session: [{accessStatus: 'Approved', armid: "aaa"}], result: []},
            {session: [{accessStatus: 'Pending', armID: "aaa"}], result: []},
            {session: [{accessStatus: 'Pending', armID: "aaa"}, {accessStatus: 'Approved', armID: "aaa"}], result: ["aaa"]},
        ];

        for (let t of test) {
            const result = getApprovedUserAcls(t.session);
            expect(result).toStrictEqual(t.result);
        }
    });
});