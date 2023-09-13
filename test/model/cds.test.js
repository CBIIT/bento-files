const {getFileField} = require("../../services/file-auth");
jest.mock("../../services/file-auth");
describe('CDS test', () => {

    getFileField.mockImplementation((data) => {
        return data.file[0].file_url_in_cds;
    });

    test('get location test', () => {
        const location = "test location";
        let data = {
            file: [
                {
                    file_url_in_cds: location
                }
            ]
        }
        expect(getFileField(data)).toBe(location);
    });
});
