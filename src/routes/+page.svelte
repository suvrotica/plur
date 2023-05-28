<script lang="ts">
    import { collection, addDoc, getDocs, query, doc, updateDoc } from "firebase/firestore";
    import { db } from "$lib/firestore"; 
  
    type Entry = { id: string, date: string, description: string, debitAccount: string, creditAccount: string, debitAmount: number, creditAmount: number };
    let entries: Entry[] = [];
    let id: string = '';
    let date: string = '';
    let description: string = '';
    let debitAccount: string = '';
    let creditAccount: string = '';
    let debitAmount: number;
    let creditAmount: number;
    let showTooltip = false;
  
    async function addEntry(): Promise<void> {
      const newEntry = { date, description, debitAccount, creditAccount, debitAmount, creditAmount };
  
      if (id) {
        // update existing document
        const docRef = doc(db, "journalEntries", id);
        await updateDoc(docRef, newEntry);
        id = ''; // reset id
      } else {
        // add new document
        const docRef = await addDoc(collection(db, "journalEntries"), newEntry);
        console.log("Document written with ID: ", docRef.id);
      }
  
      date = '';
      description = '';
      debitAccount = '';
      creditAccount = '';
      debitAmount = 0;
      creditAmount = 0;
  
      // fetch entries again to ensure local data is up-to-date
      fetchEntries();
    }
  
    async function fetchEntries(): Promise<void> {
      const q = query(collection(db, "journalEntries"));
      const querySnapshot = await getDocs(q);
  
      entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Entry, 'id'>) }));
    }
  
    function editEntry(entry: Entry): void {
      id = entry.id;
      date = entry.date;
      description = entry.description;
      debitAccount = entry.debitAccount;
      creditAccount = entry.creditAccount;
      debitAmount = entry.debitAmount;
      creditAmount = entry.creditAmount;
    }
  
    fetchEntries();
  </script>
  
 
  <style>
     .tooltip {
      position: relative;
      display: inline-block;
    }
    
    .tooltip .tooltip-text {
      visibility: hidden;
      background-color: #555;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      position: absolute;
      z-index: 1;
      bottom: 125%; /* Position the tooltip above the text */
      left: 50%;
      margin-left: -60px;
      width: 120px;
      opacity: 0;
      transition: opacity 0.3s;
    }
  
    .tooltip:hover .tooltip-text {
      visibility: visible;
      opacity: 1;
    }
    /* Add your PicoCSS styles here */
    .form-group {
      margin-bottom: 1em;
    }

    
  </style>



  
<h1>Journal Entries</h1>
  
<form on:submit|preventDefault={addEntry}>
  <div class="form-group">
    <label>
      Date
      <input bind:value={date} type="date" required>
    </label>
  </div>
  
  <div class="form-group">
    <label>
      Description
      <input bind:value={description} type="text" required>
    </label>
  </div>
  
  <div class="form-group">
      <label for="debitAccount" class="tooltip">
        Debit Account
        <span class="tooltip-text">The account that increases an asset or expense, or decreases a liability or equity.</span>
      </label>
      <input id="debitAccount" bind:value={debitAccount} type="text" required>
    </div>
    
    <div class="form-group">
      <label for="creditAccount" class="tooltip">
        Credit Account
        <span class="tooltip-text">The account that decreases an asset or expense, or increases a liability or equity.</span>
      </label>
      <input id="creditAccount" bind:value={creditAccount} type="text" required>
    </div>
  
  <div class="form-group">
    <label>
      Debit Amount
      <input bind:value={debitAmount} type="number" required>
    </label>
  </div>
  
  <div class="form-group">
    <label>
      Credit Amount
      <input bind:value={creditAmount} type="number" required>
    </label>
  </div>
  
  <button type="submit">Add Entry</button>
</form>

  
<table role="grid">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Description</th>
        <th scope="col">Debit Account</th>
        <th scope="col">Credit Account</th>
        <th scope="col">Debit Amount</th>
        <th scope="col">Credit Amount</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each entries as entry (entry.id)}
        <tr>
          <th scope="row">{entry.date}</th>
          <td>{entry.description}</td>
          <td>{entry.debitAccount}</td>
          <td>{entry.creditAccount}</td>
          <td>{entry.debitAmount}</td>
          <td>{entry.creditAmount}</td>
          <td>
            <button on:click={() => editEntry(entry)}>Edit</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  
 

  