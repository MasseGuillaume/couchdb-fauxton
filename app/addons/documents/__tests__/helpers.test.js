// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.
import Helpers from "../helpers";

describe('Helpers', () => {

  describe('parseJSON', () => {
    it('replaces "\\n" with actual newlines', () => {
      var string = 'I am a string\\nwith\\nfour\\nlinebreaks\\nin';
      var result = Helpers.parseJSON(string);
      expect(result.match(/\n/g).length).toBe(4);
    });
  });

  describe('truncateDoc', () => {
    var sevenLineDoc = '{\n"line2": 2,\n"line3": 3,\n"line4": 4,\n"line5": 5,\n"line6": 6\n}';

    it('does no truncation if maxRows set higher than doc', () => {
      var result = Helpers.truncateDoc(sevenLineDoc, 10);
      expect(result.isTruncated).toBe(false);
      expect(result.content).toBe(result.content);
    });

    it('truncates by specified line count', () => {
      var result = Helpers.truncateDoc(sevenLineDoc, 5);
      expect(result.isTruncated).toBe(true);
      expect(result.content).toBe('{\n"line2": 2,\n"line3": 3,\n"line4": 4,\n"line5": 5,');

      var result2 = Helpers.truncateDoc(sevenLineDoc, 2);
      expect(result2.isTruncated).toBe(true);
      expect(result2.content).toBe('{\n"line2": 2,');
    });

  });

});
