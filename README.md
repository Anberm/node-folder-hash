﻿# folderHash 

## Description 
Create a hash checksum over a folder or a file.  
The hashes are propagated upwards, the hash that is returned for a folder is generated over all the hashes of its children.  
The hashes are generated with the _sha1_ algorithm and returned in _base64_ encoding.

The returned information looks like this:

    { name: 'test', 
      hash: 'qmUXLCsTQGOEF6p0w9V78MC7sJI=',
      children: [
        { name: 'helper', 
          hash: 'x1CX3yVH3UuLTw7zcSitSs/PbGE=',
          children: [
            { name: 'helper.js', hash: 'pHYwd8k/oZV01oABTz9MC8KovkU=' }
          ] },
        { name: 'test.js', hash: 'L/vqpdQhxmD5w62k24m4TuZJ1PM=' }
      ] 
    }

Each file returns a name and a hash, and each folder returns additionally an array of children (file or folder elements).  

## Usage 
First, install the dependencies by executing `npm install`.  

### With promises  

    var hasher = require('folder-hash');
    // pass element name and folder path separately
    hasher.hashElement('node_modules', __dirname).then(function (hash) {
        console.log('Result for folder "node_modules" in directory "' + __dirname + '":');
        console.log(hash.toString());
    });
    // pass element path directly
    hasher.hashElement(__dirname).then(function (hash) {
        console.log('Result for folder "' + __dirname + '":');
        console.log(hash.toString());
    });
    // pass options (example: exclude dotFiles)
    var options = { excludes: ['.*'], match: { basename: true, path: false } };
    hasher.hashElement(__dirname, options, function (error, hash)) {
        if (error) return console.error('hashing failed:', error);
        console.log('Result for folder "' + __dirname + '":');
        console.log(hash.toString());
    });


### With callbacks

    var hasher = require('folder-hash');
    // pass element name and folder path separately
    hasher.hashElement('node_modules', __dirname, function (error, hash)) {
        if (error) return console.error('hashing failed:', error);
        console.log('Result for folder "node_modules" in directory "' + __dirname + '":');
        console.log(hash.toString());
    });
    // pass element path directly
    hasher.hashElement(__dirname, function (error, hash)) {
        if (error) return console.error('hashing failed:', error);
        console.log('Result for folder "' + __dirname + '":');
        console.log(hash.toString());
    });
    // pass options (example: exclude dotFiles)
    var options = { excludes: ['**/.*'], match: { basename: false, path: true } };
    hasher.hashElement(__dirname, options, function (error, hash)) {
        if (error) return console.error('hashing failed:', error);
        console.log('Result for folder "' + __dirname + '":');
        console.log(hash.toString());
    });


### Parameters for the hashElement function

<table class="params">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Attributes</th>
            <th class="last">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="name"><code>name</code></td>
            <td class="type">
                <span class="param-type">string</span>
            </td>
            <td class="attributes">
            </td>
            <td class="description last">element name or an element's path</td>
        </tr>
        <tr>
            <td class="name"><code>dir</code></td>
            <td class="type">
                <span class="param-type">string</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="description last">directory that contains the element (if omitted is generated from name)</td>
        </tr>
        <tr>
            <td class="name"><code>options</code></td>
            <td class="type">
                <span class="param-type">Object</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="description last">
                Options object (see below)
            </td>
        </tr>
        <tr>
            <td class="name"><code>callback</code></td>
            <td class="type">
                <span class="param-type">fn</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="description last">Error-first callback function</td>
        </tr>
    </tbody>
</table>

#### Options object properties
<table class="params">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Attributes</th>
            <th>Default</th>
            <th class="last">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="name"><code>algo</code></td>
            <td class="type">
                <span class="param-type">string</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="default">
                'sha1'
            </td>
            <td class="description last">checksum algorithm, see options in crypto.getHashes()</td>
        </tr>
        <tr>
            <td class="name"><code>encoding</code></td>
            <td class="type">
                <span class="param-type">string</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="default">
                'base64'
            </td>
            <td class="description last">encoding of the resulting hash. One of 'base64', 'hex' or 'binary'</td>
        </tr>
        <tr>
            <td class="name"><code>excludes</code></td>
            <td class="type">
                <span class="param-type">Array.&lt;string&gt;</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="default">
                []
            </td>
            <td class="description last">Array of optional exclude file glob patterns, see minimatch doc</td>
        </tr>
        <tr>
            <td class="name"><code>match.basename</code></td>
            <td class="type">
                <span class="param-type">bool</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="default">
                true
            </td>
            <td class="description last">Match the exclude patterns to the file/folder name</td>
        </tr>
        <tr>
            <td class="name"><code>match.path</code></td>
            <td class="type">
                <span class="param-type">bool</span>
            </td>
            <td class="attributes">
                &lt;optional&gt;<br>
            </td>
            <td class="default">
                true
            </td>
            <td class="description last">Match the exclude patterns to the file/folder path</td>
        </tr>
    </tbody>
</table>


## Behavior
The behavior is documented and verified in the unit tests. Execute `npm test` or `mocha test`, and have a look at the _test_ subfolder.  

### Creating hashes over files
**The hashes are the same if:**

- A file is checked again
- Two files have the same name and content (but exist in different folders)

**The hashes are different if:**

- A file was renamed or its content was changed
- Two files have the same name but different content
- Two files have the same content but different names

### Creating hashes over folders
Content means in this case a folders children - both the files and the subfolders with their children.

**The hashes are the same if:**

- A folder is checked again
- Two folders have the same name and content (but have different parent folders)

**The hashes are different if:**

- A file somewhere in the directory structure was renamed or its content was changed
- Two folders have the same name but different content
- Two folders have the same content but different names

## License
MIT, see LICENSE.txt